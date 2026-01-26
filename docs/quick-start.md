# Quick Start Guide

Get your first anime episode encoded in under 10 minutes!

## Prerequisites

- Completed [Installation](installation.md)
- Google Colab notebook opened
- Google Drive mounted

## 5-Minute Workflow

### Step 1: Configure Settings (2 minutes)

Find the **Control Panel** cell and modify these key settings:

```python
# ===== DOWNLOAD SETTINGS =====
DOWNLOAD_URL = "https://nyaa.si/download/1234567.torrent"  # Your torrent/magnet/direct link

# ===== ENCODE SETTINGS =====
SELECTED_PROFILE = "Balanced 1080p"  # Choose profile
USE_GPU = True  # Keep True for speed

# ===== FOLDER SETTINGS =====
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"  # Change if needed
```

::: tip Finding Download Links
Popular anime torrent sources:

- [nyaa.si](https://nyaa.si) - Anime torrents
- [subsplease.org](https://subsplease.org) - Quick releases
- Direct download links also supported

### Step 2: Run the Workflow (1 minute setup)

Scroll to the **Main Workflow** cell and click **Run** ▶️

The workflow will automatically:

1. ⬇️ Download your file
2. 🎬 Encode with selected profile
3. ☁️ Upload to Google Drive
4. 🔌 Shutdown (optional)

### Step 3: Monitor Progress (5-10 minutes)

Watch the live output:

```
==============================================================
DOWNLOADING
==============================================================
URL: https://nyaa.si/download/1234567.torrent

[#1 50MiB/350MiB(14%) CN:16 DL:15MiB ETA:20s]
Download complete. Files in temp folder:

==============================================================
ENCODING
==============================================================
Input: [SubsPlease] Anime Name - 01 (1080p).mkv
Output: [SubsPlease] Anime Name - 01_1080p.mkv

frame= 5234 fps=182 q=24.0 size=  145MiB time=00:03:38.20 bitrate=5432.1kbits/s speed=7.6x

Encoding complete: /content/temp_downloads/[SubsPlease] Anime Name - 01_1080p.mkv

==============================================================
MOVING TO DRIVE
==============================================================
Source: /content/temp_downloads/[SubsPlease] Anime Name - 01_1080p.mkv
Destination: /content/drive/MyDrive/Anime/Downloads/[SubsPlease] Anime Name - 01_1080p.mkv

Successfully moved to Google Drive
```

::: success Done!
Your encoded file is now in Google Drive!

## Common Profiles Quick Reference

Choose the right profile for your needs:

| Profile | Best For | File Size (24min) | Speed (T4 GPU) |
|---------|----------|-------------------|----------------|
| **High Quality 1080p** | Archival, maximum quality | ~800 MB | 3-4 min |
| **Balanced 1080p** | General use, good quality/size | ~650 MB | 3-5 min |
| **Small 720p** | Space saving, still great | ~400 MB | 2-3 min |
| **Mobile 480p** | Phones, tablets | ~250 MB | 1-2 min |
| **Mobile 360p** | Low bandwidth, small screens | ~150 MB | 1-2 min |

Change profile:
```python
SELECTED_PROFILE = "Small 720p"  # Just change this line
```

## Quick Examples

### Example 1: Batch Download Season

```python
# Download entire season torrent
DOWNLOAD_URL = "https://nyaa.si/download/season-pack.torrent"

# The workflow will process all episodes automatically
ENABLE_DOWNLOAD = True
ENABLE_ENCODE = True
```

### Example 2: Re-encode Existing File

Already have files in `/content/temp_downloads/`?

```python
# Skip download, just encode
ENABLE_DOWNLOAD = False
ENABLE_ENCODE = True

# Will encode latest video file in temp folder
```

### Example 3: Maximum Quality Archival

```python
# Best quality settings
SELECTED_PROFILE = "High Quality 1080p"
USE_GPU = False  # Use x265 CPU for best quality

# Slower but best visual quality
```

### Example 4: Quick Mobile Encode

```python
# Fast & small
SELECTED_PROFILE = "Mobile 480p"
USE_GPU = True

# Perfect for phone viewing
```

## Understanding the Output

Your encoded file will have a quality suffix:

```
Original:  [Group] Anime Name - 01 (1080p).mkv
Encoded:   [Group] Anime Name - 01_1080p.mkv
                            ^^^^^^ Added suffix
```

## Workflow Controls

Enable/disable specific steps:

```python
ENABLE_DOWNLOAD = True        # Download files
ENABLE_ENCODE = True          # Encode videos
ENABLE_MOVE_TO_DRIVE = True   # Move to Drive
ENABLE_AUTO_SHUTDOWN = False  # Auto shutdown (set False for testing)
```

::: warning Auto Shutdown
When `ENABLE_AUTO_SHUTDOWN = True`, Colab will disconnect after completion. Set to `False` if you want to run multiple encodes.

## Tips for First-Time Users

### 1. Start Small

Test with a single episode before batch processing:

- Use a short video (~5 min) for first test
- Verify quality settings meet your needs
- Check output file size and quality

### 2. Monitor Storage

Check Google Drive space before starting:

```python
!df -h /content/drive
```

### 3. GPU vs CPU

- **GPU (NVENC)**: Fast encoding, good quality, 5-10x faster
- **CPU (x265)**: Slower encoding, best quality, better for archival

Start with GPU, switch to CPU if you need maximum quality.

### 4. Download Sources

Supported:
- ✅ Torrent files (`.torrent`)
- ✅ Magnet links (`magnet:?xt=...`)
- ✅ Direct HTTP/HTTPS downloads
- ✅ Multi-file torrents (season packs)

### 5. Typical Runtime

For a 24-minute 1080p anime episode on T4 GPU:

- Download: 2-10 min (depends on seeders)
- Encode: 3-5 min
- Upload to Drive: 1-2 min
- **Total**: ~6-17 minutes

## Next Steps

Now that you've completed your first encode:

- [Learn about encoding profiles](profiles.md) - Optimize quality and size
- [Advanced configuration](configuration.md) - Fine-tune settings
- [Batch processing](advanced/batch-processing.md) - Process multiple files
- [Custom profiles](advanced/custom-profiles.md) - Create your own presets

## Quick Troubleshooting

### No video files found

```python
# Check temp folder contents
!ls -lh /content/temp_downloads/
```

Make sure `.mkv`, `.mp4`, or `.webm` files are present.

### Encoding too slow

```python
# Make sure GPU is enabled
USE_GPU = True

# Or use lower resolution
SELECTED_PROFILE = "Small 720p"
```

### Out of Drive storage

```python
# Use more aggressive compression
SELECTED_PROFILE = "Mobile 480p"

# Or free up space in Drive
```

For more issues, see [Troubleshooting](troubleshooting.md).

---

::: success You're Ready!
You now know the basics. Happy encoding! 🎬
