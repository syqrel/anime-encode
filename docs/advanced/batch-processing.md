# Batch Processing

Process multiple video files automatically with advanced batch workflows.

## Basic Batch Processing

The default workflow processes the **latest** video file in the temp folder. For true batch processing, you need to modify the workflow.

## Method 1: Season Pack Torrents

Download multi-file torrents and process all files.

### Configuration

```python
# Download season pack
DOWNLOAD_URL = "https://nyaa.si/download/season-pack.torrent"

# Allow multiple downloads
ARIA2_MAX_JOBS = 5

# Enable workflow
ENABLE_DOWNLOAD = True
ENABLE_ENCODE = True
ENABLE_MOVE_TO_DRIVE = True
```

### Batch Encoding Loop

Replace the main workflow cell with this:

```python
# ===== BATCH WORKFLOW =====

encoded_files = []

# Step 1: Download
if ENABLE_DOWNLOAD:
download_success = download_file(DOWNLOAD_URL)
else:
download_success = True

# Step 2: Find all video files
if ENABLE_ENCODE and download_success:
video_files = []
for ext in VIDEO_EXTENSIONS:
video_files.extend(glob.glob(os.path.join(TEMP_DIR, ext), recursive=True))

print(f"\n{'='*60}")
print(f"Found {len(video_files)} video files to encode")
print(f"{'='*60}")

for i, video_file in enumerate(video_files, 1):
print(f"\n>>> Processing {i}/{len(video_files)}: {Path(video_file).name}")

# Encode
encoded_path = encode_video(video_file, profile, use_gpu=USE_GPU)

if encoded_path:
    encoded_files.append(encoded_path)

    # Move to Drive
    if ENABLE_MOVE_TO_DRIVE:
        move_to_drive(encoded_path)

print(f"\n{'='*60}")
print(f"BATCH COMPLETE")
print(f"{'='*60}")
print(f"Processed: {len(encoded_files)} files")
for f in encoded_files:
print(f"  - {Path(f).name}")
```

## Method 2: Manual File Placement

Place multiple files manually and process them.

### Steps

1. Disable download:

```python
ENABLE_DOWNLOAD = False
```

2. Upload files to Colab:

```python
from google.colab import files
uploaded = files.upload()

# Move to temp folder
!mv *.mkv /content/temp_downloads/
```

Or copy from Drive:

```python
!cp /content/drive/MyDrive/Source/*.mkv /content/temp_downloads/
```

3. Use batch workflow (from Method 1)

## Method 3: Incremental Processing

Process files one at a time with checkpointing.

### Checkpoint System

```python
import json

CHECKPOINT_FILE = "/content/drive/MyDrive/encoding_checkpoint.json"

def load_checkpoint():
if os.path.exists(CHECKPOINT_FILE):
with open(CHECKPOINT_FILE, 'r') as f:
    return json.load(f)
return {"processed": [], "failed": []}

def save_checkpoint(data):
with open(CHECKPOINT_FILE, 'w') as f:
json.dump(data, f, indent=2)

# Load checkpoint
checkpoint = load_checkpoint()
processed = set(checkpoint["processed"])
failed = set(checkpoint["failed"])

# Find all videos
video_files = []
for ext in VIDEO_EXTENSIONS:
video_files.extend(glob.glob(os.path.join(TEMP_DIR, ext), recursive=True))

# Process unprocessed files
for video_file in video_files:
filename = Path(video_file).name

if filename in processed:
print(f"⏭️  Skipping (already processed): {filename}")
continue

if filename in failed:
print(f"⚠️  Skipping (previously failed): {filename}")
continue

try:
print(f"\n🎬 Encoding: {filename}")
encoded_path = encode_video(video_file, profile, USE_GPU)

if encoded_path and ENABLE_MOVE_TO_DRIVE:
    move_to_drive(encoded_path)

processed.add(filename)
checkpoint["processed"] = list(processed)
save_checkpoint(checkpoint)
print(f"✅ Completed: {filename}")

except Exception as e:
print(f"❌ Failed: {filename} - {e}")
failed.add(filename)
checkpoint["failed"] = list(failed)
save_checkpoint(checkpoint)

print(f"\n{'='*60}")
print(f"Batch Summary:")
print(f"Processed: {len(processed)}")
print(f"Failed: {len(failed)}")
print(f"{'='*60}")
```

### Benefits

- Resume after disconnection
- Skip already processed files
- Track failures
- Persistent state in Drive

## Method 4: Quality Ladder

Encode same file at multiple quality levels.

```python
quality_ladder = [
"High Quality 1080p",
"Balanced 1080p",
"Small 720p",
"Mobile 480p"
]

# Find source video
source_video = find_latest_video()

if source_video:
for profile_name in quality_ladder:
print(f"\n{'='*60}")
print(f"Encoding with profile: {profile_name}")
print(f"{'='*60}")

profile = PROFILES[profile_name]
encoded_path = encode_video(source_video, profile, USE_GPU)

if encoded_path and ENABLE_MOVE_TO_DRIVE:
    move_to_drive(encoded_path)

print(f"\nQuality ladder complete!")
```

## Advanced Batch Strategies

### Parallel Encoding

Encode multiple files simultaneously (requires multiple GPUs or CPU cores):

```python
from multiprocessing import Pool

def encode_wrapper(args):
video_file, profile, use_gpu = args
return encode_video(video_file, profile, use_gpu)

# Find all videos
video_files = []
for ext in VIDEO_EXTENSIONS:
video_files.extend(glob.glob(os.path.join(TEMP_DIR, ext), recursive=True))

# Prepare arguments
args_list = [(v, profile, USE_GPU) for v in video_files]

# Parallel encode (2 at a time)
with Pool(2) as pool:
encoded_paths = pool.map(encode_wrapper, args_list)

# Move to Drive
for encoded_path in encoded_paths:
if encoded_path:
move_to_drive(encoded_path)
```

::: warning GPU Considerations
Colab typically has 1 GPU. Parallel GPU encoding may not work. Use for CPU encoding only.

### Priority Queue

Process files by priority:

```python
import re

def get_episode_number(filename):
"""Extract episode number from filename"""
match = re.search(r'[Ee](\d+)|[ -](\d+)[ -]', filename)
if match:
return int(match.group(1) or match.group(2))
return 999

# Find and sort by episode
video_files = []
for ext in VIDEO_EXTENSIONS:
video_files.extend(glob.glob(os.path.join(TEMP_DIR, ext), recursive=True))

# Sort by episode number
video_files.sort(key=lambda x: get_episode_number(Path(x).name))

print("Processing order:")
for i, vf in enumerate(video_files, 1):
ep = get_episode_number(Path(vf).name)
print(f"{i}. Episode {ep}: {Path(vf).name}")

# Process in order
for video_file in video_files:
encoded_path = encode_video(video_file, profile, USE_GPU)
if encoded_path and ENABLE_MOVE_TO_DRIVE:
move_to_drive(encoded_path)
```

### Conditional Processing

Process based on file characteristics:

```python
import subprocess
import json

def get_video_info(filepath):
"""Get video metadata"""
cmd = [
"ffprobe",
"-v", "quiet",
"-print_format", "json",
"-show_streams",
filepath
]
result = subprocess.run(cmd, capture_output=True, text=True)
return json.loads(result.stdout)

# Find all videos
video_files = []
for ext in VIDEO_EXTENSIONS:
video_files.extend(glob.glob(os.path.join(TEMP_DIR, ext), recursive=True))

for video_file in video_files:
info = get_video_info(video_file)

# Get video stream info
video_stream = next((s for s in info['streams'] if s['codec_type'] == 'video'), None)

if not video_stream:
continue

height = int(video_stream.get('height', 0))
codec = video_stream.get('codec_name', '')

print(f"\nFile: {Path(video_file).name}")
print(f"  Resolution: {height}p")
print(f"  Codec: {codec}")

# Skip if already HEVC
if codec == 'hevc':
print("  ⏭️  Already HEVC, skipping")
continue

# Choose profile based on resolution
if height >= 1080:
selected_profile = "Balanced 1080p"
elif height >= 720:
selected_profile = "Small 720p"
else:
selected_profile = "Mobile 480p"

print(f"  🎬 Using profile: {selected_profile}")

profile = PROFILES[selected_profile]
encoded_path = encode_video(video_file, profile, USE_GPU)

if encoded_path and ENABLE_MOVE_TO_DRIVE:
move_to_drive(encoded_path)
```

## Monitoring Batch Progress

### Progress Bar

```python
from tqdm.notebook import tqdm

video_files = []
for ext in VIDEO_EXTENSIONS:
video_files.extend(glob.glob(os.path.join(TEMP_DIR, ext), recursive=True))

for video_file in tqdm(video_files, desc="Encoding batch"):
encoded_path = encode_video(video_file, profile, USE_GPU)
if encoded_path and ENABLE_MOVE_TO_DRIVE:
move_to_drive(encoded_path)
```

### Email Notification

```python
from google.colab import auth
from googleapiclient.discovery import build
from email.mime.text import MIMEText
import base64

def send_email(to, subject, body):
auth.authenticate_user()
service = build('gmail', 'v1')

message = MIMEText(body)
message['to'] = to
message['subject'] = subject

raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
service.users().messages().send(
userId='me',
body={'raw': raw}
).execute()

# After batch completes
send_email(
to="your-email@gmail.com",
subject="Batch Encoding Complete",
body=f"Processed {len(encoded_files)} files successfully."
)
```

## Storage Management

### Clean Up Source Files

After successful encoding:

```python
for video_file in video_files:
if Path(video_file).exists():
print(f"Deleting source: {Path(video_file).name}")
os.remove(video_file)
```

### Verify Before Cleanup

```python
def verify_encoding(source, encoded):
"""Compare durations to verify successful encode"""
def get_duration(filepath):
result = subprocess.run([
    "ffprobe", "-v", "quiet",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    filepath
], capture_output=True, text=True)
return float(result.stdout.strip())

source_dur = get_duration(source)
encoded_dur = get_duration(encoded)

# Allow 1 second difference
return abs(source_dur - encoded_dur) < 1

# Use in batch workflow
if verify_encoding(video_file, encoded_path):
os.remove(video_file)
else:
print(f"⚠️  Verification failed, keeping source")
```

## Best Practices

### 1. Start Small

Test on 2-3 files before full season:

```python
# Limit for testing
video_files = video_files[:3]
```

### 2. Monitor Resources

```python
# Check space regularly
!df -h /content
!df -h /content/drive
```

### 3. Use Checkpoints

Always implement checkpoint system for large batches.

### 4. Set Realistic Expectations

**Free Colab**:

- Process 3-5 episodes per session
- ~12 hour limit
- May disconnect

**Colab Pro**:

- Process 10-15 episodes per session
- ~24 hour limit
- More stable

### 5. Handle Errors Gracefully

```python
try:
encoded_path = encode_video(video_file, profile, USE_GPU)
except Exception as e:
print(f"Error encoding {video_file}: {e}")
# Log error
# Continue to next file
continue
```

## Troubleshooting

### Batch stops after first file

Check workflow loop - default workflow only processes latest file.

### Out of disk space mid-batch

```python
# Delete encoded source files as you go
os.remove(video_file)
```

### Session disconnects

Use checkpoint system to resume.

### Slow batch processing

- Use GPU encoding
- Lower resolution
- Reduce CRF slightly

---

Ready for batch encoding? Start with Method 1 (Season Packs) for simplest workflow!
