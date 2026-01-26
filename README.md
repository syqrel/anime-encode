# Anime FFmpeg Re-Encoder Notebook

[![Documentation](https://img.shields.io/badge/docs-vitepress-646cff)](https://syqrel.github.io/anime-encode/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/syqrel/anime-encode)
[![Colab](https://img.shields.io/badge/Platform-Google%20Colab-F9AB00?logo=google-colab)](https://colab.research.google.com/)

Automated anime encoding workflow for Google Colab with support for downloading, encoding, and uploading to Google Drive. Optimized for anime content with HEVC 10-bit encoding (NVENC GPU/x265 CPU).

📖 **[Read Full Documentation](https://syqrel.github.io/anime-encode/)**

## Features

- **Automated Workflow**: Download → Encode → Upload to Google Drive
- **Flexible Encoding**: Support for both NVENC GPU and x265 CPU encoding
- **Multiple Presets**: Pre-configured quality profiles from 360p to 1080p
- **Torrent/Direct Download**: Built-in aria2 downloader with multi-connection support
- **Batch Processing**: Process multiple video files automatically
- **Auto Shutdown**: Optional runtime shutdown after completion
- **Modern Codecs**: HEVC 10-bit video with Opus audio

## Encoding Profiles

| Profile | Resolution | CRF/QP | Audio | Bitrate | Use Case |
|---------|-----------|--------|--------|---------|----------|
| High Quality 1080p | 1080p | 22 | Opus | 160k | Maximum quality |
| Balanced 1080p | 1080p | 24 | Opus | 128k | Quality/size balance |
| Small 720p | 720p | 26 | Opus | 112k | Space saving |
| Mobile 480p | 480p | 28 | Opus | 96k | Mobile devices |
| Mobile 360p | 360p | 30 | Opus | 96k | Low bandwidth |

## Requirements

- Google Colab (Free/Pro)
- Google Drive (for output storage)
- FFmpeg with NVENC support (GPU) or x265 (CPU)
- aria2 (for downloading)

## Installation

The notebook automatically installs all required dependencies:
- FFmpeg
- aria2
- mkvtoolnix
- mediainfo
- tqdm

## Usage

### 1. Mount Google Drive

The notebook will prompt you to mount your Google Drive for output storage.

### 2. Configure Settings

Edit the control panel in Cell 2:

```python
# Folder settings
TEMP_DIR = "/content/temp_downloads"
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"

# Encoding settings
USE_GPU = True  # True = NVENC, False = x265
SELECTED_PROFILE = "Mobile 360p"  # Choose from available profiles

# Download settings
DOWNLOAD_URL = "https://example.com/file.torrent"
ARIA2_CONCURRENT = 16
ARIA2_SPLIT = 16

# Workflow control
ENABLE_DOWNLOAD = True
ENABLE_ENCODE = True
ENABLE_MOVE_TO_DRIVE = True
ENABLE_AUTO_SHUTDOWN = True
```

### 3. Run Workflow

Execute the main workflow cell to start the process:
1. Download files using aria2
2. Automatically detect video files
3. Encode with selected profile
4. Move to Google Drive
5. Optional auto-shutdown

## Workflow Steps

### Step 1: Download
- Downloads torrents, magnets, or direct links using aria2
- Multi-threaded downloads with configurable connections
- Saves to temporary directory

### Step 2: Encode
- Automatically finds latest video file
- Encodes with FFmpeg using selected profile
- Supports NVENC (GPU) or x265 (CPU)
- HEVC 10-bit output with optimal settings for anime

### Step 3: Upload
- Moves encoded file to Google Drive
- Preserves filename with quality suffix
- Verifies successful transfer

### Step 4: Auto Shutdown (Optional)
- Verifies file exists in Google Drive
- Shuts down runtime after configurable delay
- Saves Colab compute units

## Video Settings

### GPU (NVENC)
- Codec: hevc_nvenc
- Preset: p7 (highest quality)
- Tune: hq (high quality)
- 10-bit color depth
- CUDA hardware acceleration

### CPU (x265)
- Codec: libx265
- Preset: slow (quality optimized)
- Advanced psycho-visual optimizations
- 10-bit color depth

### Audio
- Codec: Opus (default) or copy original
- Stereo output
- Variable bitrate

## File Detection

Automatically detects video files with extensions:
- `.mkv`
- `.mp4`
- `.webm`

## Tips

1. **GPU vs CPU**: Use GPU (NVENC) for faster encoding, CPU (x265) for better quality
2. **Profile Selection**: Start with "Balanced 1080p" for general use
3. **Storage**: Monitor Google Drive space before encoding
4. **Download URLs**: Supports torrents, magnets, and direct download links
5. **Batch Processing**: Place multiple files in temp directory for sequential encoding

## Troubleshooting

### No video files found
- Check if download completed successfully
- Verify video file extensions are supported
- Check `TEMP_DIR` contents

### Encoding fails
- Verify FFmpeg installation
- Check GPU availability (for NVENC)
- Ensure sufficient disk space

### File not in Drive
- Check Google Drive mount status
- Verify `DRIVE_OUTPUT_FOLDER` path exists
- Check permissions

## Advanced Configuration

### Custom aria2 Settings
```python
ARIA2_CONCURRENT = 16  # Download connections
ARIA2_SPLIT = 16       # Split per file
ARIA2_MAX_JOBS = 5     # Parallel downloads
ARIA2_SEED_TIME = 0    # Torrent seeding time
```

### Custom Encoding Profile
```python
PROFILES["Custom"] = {
    "height": 720,
    "crf_qp": 23,
    "audio": "libopus",
    "audio_bitrate": "128k"
}
```

## Documentation

For complete documentation, including detailed guides, troubleshooting, and advanced usage:

🌐 **[Visit the full documentation site](https://syqrel.github.io/anime-encode/)**

Quick links:
- [Installation Guide](https://syqrel.github.io/anime-encode/installation/)
- [Quick Start](https://syqrel.github.io/anime-encode/quick-start/)
- [Encoding Profiles](https://syqrel.github.io/anime-encode/profiles/)
- [Configuration Reference](https://syqrel.github.io/anime-encode/configuration/)
- [Troubleshooting](https://syqrel.github.io/anime-encode/troubleshooting/)
- [FAQ](https://syqrel.github.io/anime-encode/faq/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This software uses third-party tools (FFmpeg, aria2, mkvtoolnix) which have their own licenses. Please refer to their respective documentation for license information.

## Credits

Optimized for anime encoding on Google Colab (2025/2026).
