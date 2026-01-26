# Troubleshooting

Common issues and solutions for the Anime FFmpeg Re-Encoder.

## Download Issues

### No files downloaded

**Symptoms**: aria2 completes but no files in temp folder

**Solutions**:

```python
# Check download folder
!ls -R /content/temp_downloads

# Check aria2 output
# Look for error messages in logs

# Verify URL is accessible
!curl -I "your-url-here"

# Try manual download test
!aria2c --dir=/content/temp_downloads "your-url"
```

### Torrent stuck at 0%

**Symptoms**: Download shows 0% for several minutes

**Solutions**:

```python
# Increase timeout
ARIA2_BT_STOP_TIMEOUT = 600  # 10 minutes

# Add trackers (for old torrents)
# Check torrent health on website first

# Try different torrent source
# Some torrents have no seeders
```

### Download very slow

**Symptoms**: Download speed under 1 MB/s

**Solutions**:

```python
# Increase connections
ARIA2_CONCURRENT = 32
ARIA2_SPLIT = 32

# Check if torrent has seeders
# Look on torrent website

# Try during off-peak hours
# Colab network can be congested

# For direct downloads, check source server speed
```

### "Too many open files" error

**Symptoms**: aria2 error about file descriptors

**Solutions**:

```python
# Reduce concurrent connections
ARIA2_CONCURRENT = 8
ARIA2_SPLIT = 8
ARIA2_MAX_JOBS = 2
```

## Encoding Issues

### "No video files found"

**Symptoms**: Encoding step reports no video files

**Solutions**:

```python
# Check temp folder contents
!ls -R /content/temp_downloads/

# Check file extensions
VIDEO_EXTENSIONS = ["**/*.mkv", "**/*.mp4", "**/*.webm", "**/*.avi"]

# Files might be in subfolder
# The ** pattern should find them, but verify:
!find /content/temp_downloads -name "*.mkv"

# Manually specify file
latest_video = "/content/temp_downloads/subfolder/file.mkv"
encoded_path = encode_video(latest_video, profile, USE_GPU)
```

### GPU encoding fails

**Symptoms**: NVENC error or codec not found

**Solutions**:

```python
# Check GPU availability
!nvidia-smi

# If no GPU, switch to CPU
USE_GPU = False

# Or change runtime type
# Runtime → Change runtime type → GPU → Save
# Then reconnect
```

### Encoding very slow

**Symptoms**: Encoding speed under 1x realtime

**Solutions**:

```python
# Use GPU if not already
USE_GPU = True

# Lower resolution
SELECTED_PROFILE = "Small 720p"

# Check GPU usage
!nvidia-smi
# Should show ffmpeg using GPU

# Check if using CPU by mistake
# Look for libx265 in ffmpeg output
# Should see hevc_nvenc for GPU
```

### "Out of memory" error

**Symptoms**: FFmpeg crashes with OOM error

**Solutions**:

```python
# Free up RAM
!sync && echo 3 > /proc/sys/vm/drop_caches

# Reduce resolution
SELECTED_PROFILE = "Small 720p"

# Close other notebooks
# Only run one encoding at a time

# Upgrade to Colab Pro
# More RAM available
```

### Output file corrupted

**Symptoms**: Video won't play or has artifacts

**Solutions**:

```python
# Check source file first
!mediainfo /content/temp_downloads/source.mkv

# Try CPU encoding (more reliable)
USE_GPU = False

# Check disk space during encode
!df -h /content

# If source is damaged, re-download
```

## Drive Issues

### "Permission denied" mounting Drive

**Symptoms**: Can't mount Google Drive

**Solutions**:

1. Disconnect and reconnect runtime
2. Clear browser cache for `colab.research.google.com`
3. Try incognito/private browsing
4. Revoke Colab permissions and re-authorize:
   - Visit [Google Account Permissions](https://myaccount.google.com/permissions)
   - Remove "Google Colaboratory"
   - Remount Drive in notebook

### "No space left on device"

**Symptoms**: Upload to Drive fails with disk space error

**Solutions**:

```python
# Check Drive space
!df -h /content/drive

# Check temp folder space
!df -h /content

# Free up Drive space
# Delete old files from Drive

# Or use smaller profile
SELECTED_PROFILE = "Small 720p"
```

### File not in Drive after upload

**Symptoms**: Workflow reports success but file missing

**Solutions**:

```python
# Check Drive folder path
!ls -la /content/drive/MyDrive/Anime/Downloads

# Verify Drive is mounted
!ls /content/drive

# Check if path exists
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"
!mkdir -p "$DRIVE_OUTPUT_FOLDER"

# Manually move file
!mv /content/temp_downloads/file.mkv /content/drive/MyDrive/Anime/
```

### Upload very slow

**Symptoms**: Transfer to Drive takes 20+ minutes

**Solutions**:

- This is normal for large files
- Google Drive has rate limits
- Colab Pro has faster Drive transfers
- Consider using smaller profiles

**Expected upload times** (1GB file):

- Free tier: 10-20 minutes
- Pro tier: 5-10 minutes

## Runtime Issues

### Runtime disconnects randomly

**Symptoms**: Session ends unexpectedly

**Solutions**:

- Keep browser tab active
- Don't let computer sleep
- Disable browser extensions
- Use Colab Pro for longer runtimes

**Free tier limits**:

- ~12 hours maximum
- Disconnects after 90 minutes idle
- May disconnect during high usage

**Pro tier limits**:

- ~24 hours maximum
- More stable connection
- Priority access

### GPU not allocated

**Symptoms**: Runtime has no GPU despite GPU setting

**Solutions**:

1. Disconnect and reconnect
2. Try different time (less congestion)
3. Use Colab Pro for guaranteed GPU
4. Fall back to CPU:

```python
USE_GPU = False
```

### "You have reached your usage limit"

**Symptoms**: Can't start new runtime

**Solutions**:

- Wait 12-24 hours for quota reset
- Upgrade to Colab Pro
- Use CPU-only runtime (usually available)

## Performance Issues

### Everything is slow

**Symptoms**: All operations sluggish

**Solutions**:

```python
# Check system resources
!free -h  # RAM usage
!df -h    # Disk usage
!top -bn1 | head -20  # CPU usage

# Restart runtime
# Runtime → Restart runtime

# Try different time
# Less congestion during off-peak hours
```

### Encoding speed dropped

**Symptoms**: Was fast, now slow

**Solutions**:

```python
# Check GPU status
!nvidia-smi

# May have been downgraded to CPU
# Check ffmpeg output for codec:
# hevc_nvenc = GPU
# libx265 = CPU

# Restart runtime
# Runtime → Restart runtime
```

## Error Messages

### "codec not found"

**Full error**: `Unknown encoder 'hevc_nvenc'`

**Solution**:

```python
# GPU not available, use CPU
USE_GPU = False

# Or check GPU
!nvidia-smi
# If no GPU, change runtime type
```

### "Invalid argument"

**Full error**: `[hevc_nvenc @ 0x...] Invalid argument`

**Solution**:

```python
# GPU driver issue, use CPU
USE_GPU = False

# Or reduce resolution
SELECTED_PROFILE = "Small 720p"
```

### "No such file or directory"

**Full error**: `No such file or directory: '/content/...'`

**Solution**:

```python
# Check path exists
!ls -la /content/temp_downloads

# Create missing folders
!mkdir -p /content/temp_downloads
!mkdir -p /content/drive/MyDrive/Anime/Downloads

# Check Drive is mounted
from google.colab import drive
drive.mount('/content/drive')
```

### "Cannot allocate memory"

**Full error**: `Cannot allocate memory`

**Solution**:

```python
# Free RAM
!sync && echo 3 > /proc/sys/vm/drop_caches

# Reduce resolution
SELECTED_PROFILE = "Mobile 480p"

# Restart runtime
```

## Quality Issues

### Output too large

**Symptoms**: File size larger than expected

**Solutions**:

```python
# Use more aggressive profile
SELECTED_PROFILE = "Small 720p"

# Check CRF value
# Lower CRF = larger file
# If custom profile, increase CRF:
PROFILES["Custom"]["crf_qp"] = 26  # Higher = smaller
```

### Output quality poor

**Symptoms**: Visible artifacts or blurriness

**Solutions**:

```python
# Use better profile
SELECTED_PROFILE = "High Quality 1080p"

# Use CPU for best quality
USE_GPU = False

# Check source quality first
!mediainfo source.mkv
# Can't improve bad source
```

### Banding in gradients

**Symptoms**: Visible color steps in sky/gradients

**Solution**:

- All profiles use 10-bit, should prevent this
- Check source file has 10-bit
- Verify output is 10-bit:

```python
!mediainfo output.mkv | grep "Bit depth"
# Should show: 10 bits
```

## Workflow Issues

### Auto-shutdown not working

**Symptoms**: Runtime doesn't disconnect after completion

**Solutions**:

```python
# Verify setting
ENABLE_AUTO_SHUTDOWN = True

# Check file exists in Drive
!ls -la /content/drive/MyDrive/Anime/Downloads/

# Check logs for error messages
# May have failed verification
```

### Batch processing stops

**Symptoms**: Only one file processed in batch

**Solutions**:

```python
# Check video file detection
VIDEO_EXTENSIONS = ["**/*.mkv", "**/*.mp4", "**/*.webm"]

# List all video files
!find /content/temp_downloads -name "*.mkv"

# Workflow processes latest file only
# For batch processing, see:
# Advanced → Batch Processing guide
```

## Getting Help

If issues persist:

1. **Check logs carefully** - Error messages are usually descriptive
2. **Verify all settings** - Review [Configuration](configuration.md)
3. **Test with simple case** - Single short video, default settings
4. **Check system resources** - Disk space, RAM, GPU
5. **Try CPU encoding** - More reliable than GPU
6. **Restart runtime** - Fresh start often helps

### Useful Debug Commands

```python
# System info
!nvidia-smi          # GPU
!free -h             # RAM
!df -h               # Disk
!lscpu | head        # CPU

# File checks
!ls -R /content/temp_downloads
!ls -la /content/drive/MyDrive/Anime
!find /content/temp_downloads -name "*.mkv"

# Version checks
!ffmpeg -version | head -1
!aria2c --version | head -1
!python --version

# Process checks
!ps aux | grep ffmpeg
!ps aux | grep aria2
```

### Reporting Issues

When reporting bugs:

1. Include full error message
2. Specify: Free or Pro tier
3. GPU type (from `nvidia-smi`)
4. Profile used
5. Source file type
6. Steps to reproduce

---

Still stuck? Check the [FAQ](faq.md) or open an issue on [GitHub](https://github.com/syqrel/anime-encode/issues).
