# Usage Guide

Complete guide to using the Anime FFmpeg Re-Encoder notebook.

## Workflow Overview

```mermaid
graph LR
A[Configure] --> B[Download]
B --> C[Encode]
C --> D[Upload to Drive]
D --> E[Auto Shutdown]

style A fill:#2196F3
style B fill:#4CAF50
style C fill:#FF9800
style D fill:#9C27B0
style E fill:#F44336
```

## Basic Usage

### 1. Open and Configure

1. Open the notebook in Google Colab
2. Mount Google Drive (Cell 1)
3. Configure settings (Cell 2)

### 2. Set Download URL

```python
DOWNLOAD_URL = "https://nyaa.si/download/1234567.torrent"
```

Supported formats:

- Torrent files (`.torrent`)
- Magnet links (`magnet:?xt=...`)
- Direct HTTP/HTTPS links
- FTP links

### 3. Choose Profile

```python
SELECTED_PROFILE = "Balanced 1080p"  # Change as needed
```

### 4. Run Workflow

Execute the main workflow cell and wait for completion.

## Advanced Usage

### Batch Processing

Process multiple files at once:

```python
# Download season pack
DOWNLOAD_URL = "https://nyaa.si/download/season-pack.torrent"

# All episodes will be processed automatically
```

The workflow will:

1. Download all files
2. Find all video files in temp folder
3. Encode each one sequentially
4. Upload all to Drive

### Manual File Placement

Skip download step by placing files manually:

```python
# Disable download
ENABLE_DOWNLOAD = False
ENABLE_ENCODE = True

# Place your .mkv/.mp4 files in:
# /content/temp_downloads/

# Workflow will encode the latest file
```

### Re-encode Existing Files

Already have files in temp folder?

```python
# Skip download
ENABLE_DOWNLOAD = False

# Find and encode latest video
latest_video = find_latest_video()
if latest_video:
encoded_path = encode_video(latest_video, profile, USE_GPU)
```

### Custom Output Location

Change where encoded files go:

```python
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Custom/Path"
os.makedirs(DRIVE_OUTPUT_FOLDER, exist_ok=True)
```

## Workflow Control

### Enable/Disable Steps

Control which steps run:

```python
ENABLE_DOWNLOAD = True        # Download step
ENABLE_ENCODE = True          # Encoding step
ENABLE_MOVE_TO_DRIVE = True   # Upload step
ENABLE_AUTO_SHUTDOWN = False  # Auto shutdown
```

Example scenarios:

**Download Only**:
```python
ENABLE_DOWNLOAD = True
ENABLE_ENCODE = False
ENABLE_MOVE_TO_DRIVE = False
```

**Encode Only**:
```python
ENABLE_DOWNLOAD = False
ENABLE_ENCODE = True
ENABLE_MOVE_TO_DRIVE = True
```

**Re-upload Existing**:
```python
ENABLE_DOWNLOAD = False
ENABLE_ENCODE = False
ENABLE_MOVE_TO_DRIVE = True
```

### Auto Shutdown

Save Colab compute units:

```python
ENABLE_AUTO_SHUTDOWN = True
SHUTDOWN_DELAY = 10  # Seconds before shutdown
```

When enabled, the runtime will:

1. Verify file exists in Drive
2. Display file size and location
3. Wait for delay period
4. Disconnect runtime

::: warning Auto Shutdown
Make sure files are in Drive before enabling! Check output logs to verify upload success.

## Download Options

### aria2 Configuration

Fine-tune download behavior:

```python
ARIA2_CONCURRENT = 16     # Connections per server
ARIA2_SPLIT = 16          # Connections per file
ARIA2_MAX_JOBS = 5        # Parallel downloads
ARIA2_SEED_TIME = 0       # Torrent seeding time (seconds)
ARIA2_BT_STOP_TIMEOUT = 300  # BT timeout
```

**High-speed connection**:
```python
ARIA2_CONCURRENT = 32
ARIA2_SPLIT = 32
```

**Slow connection**:
```python
ARIA2_CONCURRENT = 8
ARIA2_SPLIT = 8
```

### Torrent-Specific Settings

For torrents, you can adjust:

```python
ARIA2_SEED_TIME = 3600  # Seed for 1 hour after download
ARIA2_BT_STOP_TIMEOUT = 600  # Wait longer for peers
```

::: tip Seeding Etiquette
Consider seeding for a while to help the community. Set `ARIA2_SEED_TIME` to non-zero value.

## Encoding Options

### GPU vs CPU

**GPU Encoding (NVENC)**:

```python
USE_GPU = True
```

Pros:

- 5-10x faster
- Low CPU usage
- Good quality
- Free GPU on Colab

Cons:

- Slightly larger files
- Fixed presets
- GPU must be available

**CPU Encoding (x265)**:

```python
USE_GPU = False
```

Pros:

- Best quality
- Better compression
- More control
- Works without GPU

Cons:

- Much slower (0.5-1.5x realtime)
- High CPU usage
- Takes longer

### When to Use CPU

Use CPU encoding when:

- Maximum quality needed
- Encoding for archival
- GPU not available
- You have time to wait

### When to Use GPU

Use GPU encoding when:

- Speed is priority
- Good quality is sufficient
- Batch processing many files
- Using Colab Free tier efficiently

## Monitoring Progress

### Download Progress

```
[#1 50MiB/350MiB(14%) CN:16 DL:15MiB ETA:20s]
```

- `50MiB/350MiB`: Downloaded / Total
- `14%`: Progress
- `CN:16`: Active connections
- `DL:15MiB`: Download speed
- `ETA:20s`: Estimated time

### Encoding Progress

```
frame= 5234 fps=182 q=24.0 size=145MiB time=00:03:38 bitrate=5432kbits/s speed=7.6x
```

- `frame=5234`: Frames processed
- `fps=182`: Processing speed
- `q=24.0`: Quality target
- `size=145MiB`: Current output size
- `time=00:03:38`: Video duration processed
- `speed=7.6x`: Real-time multiplier

### Upload Progress

```
Successfully moved to Google Drive
-rw------- 1 root root 682M Jan 25 12:34 output.mkv
```

Shows file size and timestamp.

## File Naming

### Input Files

Supported:

- `[Group] Anime Name - 01 (1080p).mkv`
- `Anime.Name.S01E01.1080p.mkv`
- `anime_name_01.mp4`
- Any `.mkv`, `.mp4`, `.webm`

### Output Files

Automatically adds quality suffix:

```
Input:  anime_name_01.mkv
Output: anime_name_01_1080p.mkv
anime_name_01_720p.mkv  (if 720p profile)
```

## Storage Management

### Check Available Space

Before encoding:

```python
!df -h /content/drive
!du -sh /content/temp_downloads
```

### Cleanup Temp Files

After encoding:

```python
!rm -rf /content/temp_downloads/*
```

### Drive Storage

Monitor Drive usage:

```python
from shutil import disk_usage

total, used, free = disk_usage("/content/drive")
print(f"Drive Free: {free / (1024**3):.2f} GB")
```

## Tips & Best Practices

### 1. Test First

Always test with a single short video before batch processing:

```python
# Test with 5-10 minute video
# Verify settings
# Check output quality
# Then proceed with full episodes
```

### 2. Keep Runtime Alive

Colab may disconnect if idle:

- Keep browser tab active
- Check progress periodically
- Use Colab Pro for longer runtimes

### 3. Optimize for Your Use

Match profile to use case:

- **Streaming**: Balanced 1080p
- **Mobile**: Mobile 480p
- **Archive**: High Quality 1080p
- **Space-limited**: Small 720p

### 4. Batch Smartly

Don't process too many at once:

- Free tier: 3-5 episodes max
- Colab Pro: 10-12 episodes
- Monitor runtime limits

### 5. Verify Output

Always check encoded file:

```python
!mediainfo /path/to/encoded.mkv
```

Look for:

- Correct resolution
- HEVC codec
- 10-bit color
- Reasonable file size

## Common Workflows

### Weekly Episode Encoding

```python
# Configure once
SELECTED_PROFILE = "Balanced 1080p"
USE_GPU = True
ENABLE_AUTO_SHUTDOWN = True

# Each week:
# 1. Update DOWNLOAD_URL
# 2. Run workflow cell
# 3. Wait for completion
```

### Season Batch Processing

```python
# Download season pack
DOWNLOAD_URL = "season-pack.torrent"
ENABLE_AUTO_SHUTDOWN = False  # Process all before shutdown

# Process all episodes
# Monitor progress
# Manually shutdown when done
```

### Quality Testing

```python
# Test different profiles
for profile_name in ["Balanced 1080p", "Small 720p", "Mobile 480p"]:
SELECTED_PROFILE = profile_name
# Encode same clip
# Compare results
```

## Next Steps

- [Explore encoding profiles](profiles.md)
- [Advanced configuration](configuration.md)
- [Custom profiles](advanced/custom-profiles.md)
- [Troubleshooting](troubleshooting.md)
