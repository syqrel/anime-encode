# Configuration

Detailed configuration guide for all settings in the notebook.

## Control Panel Overview

All settings are centralized in Cell 2 (Control Panel):

```python
# ===== FOLDER SETTINGS =====
TEMP_DIR = "/content/temp_downloads"
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"

# ===== ENCODE SETTINGS =====
USE_GPU = True
SELECTED_PROFILE = "Balanced 1080p"

# ===== DOWNLOAD SETTINGS =====
DOWNLOAD_URL = "https://example.com/file.torrent"
ARIA2_CONCURRENT = 16
ARIA2_SPLIT = 16
ARIA2_MAX_JOBS = 5
ARIA2_SEED_TIME = 0
ARIA2_BT_STOP_TIMEOUT = 300

# ===== WORKFLOW CONTROL =====
ENABLE_DOWNLOAD = True
ENABLE_ENCODE = True
ENABLE_MOVE_TO_DRIVE = True
ENABLE_AUTO_SHUTDOWN = True
SHUTDOWN_DELAY = 10

# ===== VIDEO FILE DETECTION =====
VIDEO_EXTENSIONS = ["**/*.mkv", "**/*.mp4", "**/*.webm"]
```

## Folder Settings

### TEMP_DIR

Temporary download and encoding location.

```python
TEMP_DIR = "/content/temp_downloads"
```

- **Default**: `/content/temp_downloads`
- **Location**: Colab local storage (fast)
- **Persistence**: Deleted when runtime disconnects
- **Capacity**: ~100 GB (Free), ~200 GB (Pro)

::: tip Why /content?
Local storage is faster for encoding than Google Drive. Files are moved to Drive after encoding.

### DRIVE_OUTPUT_FOLDER

Final output destination in Google Drive.

```python
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"
```

- **Default**: `/content/drive/MyDrive/Anime/Downloads`
- **Location**: Your Google Drive
- **Persistence**: Permanent
- **Capacity**: Your Drive quota

**Custom paths**:

```python
# Organized by series
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/One Piece"

# Organized by season
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/2025/Winter"

# Shared folder
DRIVE_OUTPUT_FOLDER = "/content/drive/Shareddrives/Team/Anime"
```

## Encode Settings

### USE_GPU

Enable/disable GPU encoding.

```python
USE_GPU = True  # NVENC GPU
USE_GPU = False  # x265 CPU
```

| Setting | Codec | Speed | Quality | CPU Usage |
|---------|-------|-------|---------|-----------|
| `True` | NVENC | 5-10x | Very Good | Low |
| `False` | x265 | 0.5-1.5x | Excellent | High |

**Choose GPU when**:

- Speed is priority
- Batch processing
- Free/Pro tier efficiency

**Choose CPU when**:

- Quality is paramount
- Archival encoding
- Time is not critical

### SELECTED_PROFILE

Choose encoding quality profile.

```python
SELECTED_PROFILE = "Balanced 1080p"
```

Available profiles:

- `"High Quality 1080p"` - Maximum quality
- `"Balanced 1080p"` - Recommended default
- `"Small 720p"` - Space efficient
- `"Mobile 480p"` - Mobile devices
- `"Mobile 360p"` - Ultra compact

See [Encoding Profiles](profiles.md) for detailed comparison.

## Download Settings

### DOWNLOAD_URL

Source file/torrent URL.

```python
DOWNLOAD_URL = "https://nyaa.si/download/1234567.torrent"
```

**Supported formats**:

```python
# Torrent file
DOWNLOAD_URL = "https://nyaa.si/download/1234567.torrent"

# Magnet link
DOWNLOAD_URL = "magnet:?xt=urn:btih:ABC123..."

# Direct HTTP/HTTPS
DOWNLOAD_URL = "https://example.com/video.mkv"

# FTP
DOWNLOAD_URL = "ftp://server.com/path/video.mkv"
```

### ARIA2_CONCURRENT

Maximum connections per server.

```python
ARIA2_CONCURRENT = 16  # Default
```

- **Range**: 1-32
- **Default**: 16
- **Higher**: Faster downloads (if server allows)
- **Lower**: More polite to server

**Recommendations**:

- Fast connection: `32`
- Normal connection: `16`
- Slow connection: `8`
- Restrictive server: `4`

### ARIA2_SPLIT

Split download into N connections.

```python
ARIA2_SPLIT = 16  # Default
```

- **Range**: 1-32
- **Default**: 16
- **Higher**: Better for fast connections
- **Lower**: Better for slow/unstable connections

### ARIA2_MAX_JOBS

Maximum parallel downloads.

```python
ARIA2_MAX_JOBS = 5  # Default
```

- **Range**: 1-10
- **Default**: 5
- **Use case**: Multi-file torrents (season packs)

Example with season pack:

```python
# Download 3 episodes simultaneously
ARIA2_MAX_JOBS = 3
```

### ARIA2_SEED_TIME

Torrent seeding duration (seconds).

```python
ARIA2_SEED_TIME = 0  # No seeding (default)
```

**Common values**:

```python
ARIA2_SEED_TIME = 0      # No seeding
ARIA2_SEED_TIME = 600    # 10 minutes
ARIA2_SEED_TIME = 1800   # 30 minutes
ARIA2_SEED_TIME = 3600   # 1 hour
```

::: info Seeding Etiquette
Consider seeding briefly to help the community. Even 10-30 minutes helps!

### ARIA2_BT_STOP_TIMEOUT

BitTorrent stop timeout (seconds).

```python
ARIA2_BT_STOP_TIMEOUT = 300  # 5 minutes (default)
```

- **Default**: 300 (5 minutes)
- **Purpose**: Wait for peers/seeders
- **Increase**: If download gets stuck at 99%
- **Decrease**: If you want to fail faster

## Workflow Control

### ENABLE_DOWNLOAD

Enable/disable download step.

```python
ENABLE_DOWNLOAD = True   # Download files
ENABLE_DOWNLOAD = False  # Skip download
```

**Use `False` when**:

- Files already in temp folder
- Manual file placement
- Re-encoding existing files

### ENABLE_ENCODE

Enable/disable encoding step.

```python
ENABLE_ENCODE = True   # Encode videos
ENABLE_ENCODE = False  # Skip encoding
```

**Use `False` when**:

- Download only
- Testing download settings
- Moving existing encoded files

### ENABLE_MOVE_TO_DRIVE

Enable/disable Drive upload.

```python
ENABLE_MOVE_TO_DRIVE = True   # Upload to Drive
ENABLE_MOVE_TO_DRIVE = False  # Keep in temp folder
```

**Use `False` when**:

- Testing encodes
- Manual file management
- Encoding only (will download later)

### ENABLE_AUTO_SHUTDOWN

Enable/disable automatic runtime shutdown.

```python
ENABLE_AUTO_SHUTDOWN = True   # Auto disconnect
ENABLE_AUTO_SHUTDOWN = False  # Stay connected
```

**Use `True` when**:

- Single batch processing
- Saving compute units
- Unattended operation

**Use `False` when**:

- Running multiple batches
- Testing settings
- Need to inspect results

### SHUTDOWN_DELAY

Delay before shutdown (seconds).

```python
SHUTDOWN_DELAY = 10  # 10 seconds (default)
```

- **Default**: 10 seconds
- **Range**: 0-300 (5 minutes)
- **Purpose**: Time to read logs before disconnect

## Video File Detection

### VIDEO_EXTENSIONS

Glob patterns for video file detection.

```python
VIDEO_EXTENSIONS = ["**/*.mkv", "**/*.mp4", "**/*.webm"]
```

**Default patterns**:

- `**/*.mkv` - Matroska files (most anime)
- `**/*.mp4` - MP4 files
- `**/*.webm` - WebM files

**Custom patterns**:

```python
# Only MKV files
VIDEO_EXTENSIONS = ["**/*.mkv"]

# Include AVI
VIDEO_EXTENSIONS = ["**/*.mkv", "**/*.mp4", "**/*.avi"]

# Specific folder
VIDEO_EXTENSIONS = ["SubFolder/**/*.mkv"]
```

## Advanced Configuration

### Custom Profile

Create your own encoding profile:

```python
# Add to PROFILES dict
PROFILES["My Custom"] = {
"height": 900,           # Resolution
"crf_qp": 23,           # Quality (lower = better)
"audio": "libopus",     # Audio codec
"audio_bitrate": "128k" # Audio bitrate
}

# Select it
SELECTED_PROFILE = "My Custom"
```

See [Custom Profiles](advanced/custom-profiles.md) for detailed guide.

### Audio Codec Options

Available audio codecs:

```python
# Opus (default, recommended)
"audio": "libopus"
"audio_bitrate": "128k"

# AAC
"audio": "aac"
"audio_bitrate": "192k"

# Copy original (no re-encoding)
"audio": "copy"
# No audio_bitrate needed
```

### Multiple Profiles

Process same file with multiple profiles:

```python
profiles_to_test = ["Balanced 1080p", "Small 720p"]

for profile_name in profiles_to_test:
SELECTED_PROFILE = profile_name
# Run encode workflow
```

## Environment Variables

Check Colab environment:

```python
# Check GPU
!nvidia-smi

# Check disk space
!df -h

# Check RAM
!free -h

# Check CPU
!lscpu | grep "Model name"
```

## Performance Tuning

### For Speed

```python
USE_GPU = True
SELECTED_PROFILE = "Mobile 480p"  # Lower resolution
ARIA2_CONCURRENT = 32
ARIA2_SPLIT = 32
```

### For Quality

```python
USE_GPU = False  # x265 CPU
SELECTED_PROFILE = "High Quality 1080p"
# Slower but best quality
```

### For Efficiency

```python
USE_GPU = True
SELECTED_PROFILE = "Balanced 1080p"
ENABLE_AUTO_SHUTDOWN = True
# Good quality, fast, saves compute
```

## Configuration Examples

### Weekly Episode Processing

```python
TEMP_DIR = "/content/temp_downloads"
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Current"
USE_GPU = True
SELECTED_PROFILE = "Balanced 1080p"
DOWNLOAD_URL = "update weekly"
ENABLE_AUTO_SHUTDOWN = True
```

### Archival Encoding

```python
USE_GPU = False  # x265 for best quality
SELECTED_PROFILE = "High Quality 1080p"
ENABLE_AUTO_SHUTDOWN = False  # Monitor progress
```

### Batch Season Processing

```python
DOWNLOAD_URL = "season-pack-torrent"
ARIA2_MAX_JOBS = 5
ENABLE_AUTO_SHUTDOWN = False  # Process all episodes
```

### Mobile Batch Export

```python
SELECTED_PROFILE = "Mobile 480p"
USE_GPU = True  # Fast processing
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Mobile"
```

## Troubleshooting Configuration

### "File not found" errors

Check paths:

```python
# Verify temp folder
!ls -la /content/temp_downloads

# Verify Drive folder
!ls -la /content/drive/MyDrive/Anime
```

### GPU not available

```python
# Check GPU status
!nvidia-smi

# If no GPU, use CPU
USE_GPU = False
```

### Download fails

```python
# Test aria2
!aria2c --version

# Reduce connections
ARIA2_CONCURRENT = 8
ARIA2_SPLIT = 8
```

---

For more help, see [Troubleshooting](troubleshooting.md) or [FAQ](faq.md).
