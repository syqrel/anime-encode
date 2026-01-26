# Custom Encoding Profiles

Learn how to create your own custom encoding profiles tailored to your needs.

## Profile Structure

A profile is a Python dictionary with encoding parameters:

```python
PROFILES["Profile Name"] = {
"height": 1080,           # Target resolution (height in pixels)
"crf_qp": 24,            # Quality setting (lower = better quality)
"audio": "libopus",      # Audio codec
"audio_bitrate": "128k"  # Audio bitrate
}
```

## Creating Custom Profiles

### Method 1: Modify Existing Profile

Start with a built-in profile and adjust:

```python
# Copy Balanced 1080p and modify
PROFILES["My Custom 1080p"] = {
"height": 1080,
"crf_qp": 23,           # Slightly better quality
"audio": "libopus",
"audio_bitrate": "160k"  # Higher audio quality
}

SELECTED_PROFILE = "My Custom 1080p"
```

### Method 2: Create from Scratch

Define all parameters:

```python
PROFILES["Archive Quality"] = {
"height": 1080,
"crf_qp": 20,           # Very high quality
"audio": "libopus",
"audio_bitrate": "192k"  # Excellent audio
}

SELECTED_PROFILE = "Archive Quality"
```

### Method 3: Resolution Variants

Create multiple resolution variants:

```python
# 900p sweet spot
PROFILES["Custom 900p"] = {
"height": 900,           # Between 720p and 1080p
"crf_qp": 24,
"audio": "libopus",
"audio_bitrate": "128k"
}

# 540p for mobile
PROFILES["Custom 540p"] = {
"height": 540,
"crf_qp": 26,
"audio": "libopus",
"audio_bitrate": "112k"
}
```

## Understanding Parameters

### height

Target video height in pixels. Width is auto-calculated to maintain aspect ratio.

**Common values**:

```python
height: 2160  # 4K (3840x2160)
height: 1440  # 2K (2560x1440)
height: 1080  # Full HD (1920x1080)
height: 900   # Sweet spot (1600x900)
height: 720   # HD (1280x720)
height: 540   # qHD (960x540)
height: 480   # SD (854x480)
height: 360   # Low (640x360)
```

**Impact**:

- Higher = Better quality, larger file
- Lower = Faster encoding, smaller file
- Must be even number

### crf_qp

Quality setting. Lower number = better quality (but larger file).

**For GPU (NVENC)**:

```python
crf_qp: 18-20  # Near-lossless
crf_qp: 22     # Excellent quality
crf_qp: 24     # Very good (balanced)
crf_qp: 26     # Good (smaller files)
crf_qp: 28-30  # Acceptable (very small)
```

**For CPU (x265)**:

```python
crf_qp: 16-18  # Near-lossless
crf_qp: 20-22  # Excellent
crf_qp: 23-25  # Very good (recommended)
crf_qp: 26-28  # Good
crf_qp: 29-32  # Lower quality
```

**Guidelines**:

- Anime benefits from lower CRF (prevent banding)
- Start with 24, adjust up/down
- Each +1 CRF ≈ 5-10% file size reduction
- Diminishing returns below 20

### audio

Audio codec selection.

**Opus (Recommended)**:

```python
"audio": "libopus"
"audio_bitrate": "128k"  # Excellent for most use
```

Quality levels:

- `96k` - Acceptable (mobile)
- `112k` - Good
- `128k` - Very good (recommended)
- `160k` - Excellent
- `192k` - Near-transparent

**AAC (Alternative)**:

```python
"audio": "aac"
"audio_bitrate": "192k"  # Need higher bitrate than Opus
```

Use when compatibility is critical (older devices).

**Copy (No Re-encoding)**:

```python
"audio": "copy"
# No audio_bitrate needed
```

Preserves original audio. Use when source audio is already good.

### audio_bitrate

Audio bitrate (only for transcoded audio, not "copy").

**Opus recommendations**:

- `96k` - Minimum acceptable
- `128k` - Recommended default
- `160k` - High quality
- `192k+` - Overkill for most

**AAC recommendations**:

- `128k` - Minimum
- `192k` - Recommended
- `256k` - High quality

## Example Custom Profiles

### Ultra Quality Archive

For long-term archival of favorites:

```python
PROFILES["Ultra Archive"] = {
"height": 1080,
"crf_qp": 18,           # Near-lossless
"audio": "copy",        # Keep original audio
}

USE_GPU = False  # Use x265 CPU for best quality
```

### Streaming Optimized

Fast encoding, good quality, streaming-friendly:

```python
PROFILES["Stream 1080p"] = {
"height": 1080,
"crf_qp": 25,           # Lighter compression
"audio": "libopus",
"audio_bitrate": "112k"
}

USE_GPU = True  # Fast GPU encoding
```

### Space Saver

Maximum compression while acceptable quality:

```python
PROFILES["Tiny 720p"] = {
"height": 720,
"crf_qp": 28,
"audio": "libopus",
"audio_bitrate": "96k"
}
```

### 4K Downscale

Downscale 4K sources to 1080p optimally:

```python
PROFILES["4K to 1080p"] = {
"height": 1080,
"crf_qp": 22,           # Higher quality (good source)
"audio": "libopus",
"audio_bitrate": "160k"
}
```

### Tablet Optimized

Perfect for 10-inch tablets:

```python
PROFILES["Tablet 900p"] = {
"height": 900,          # Sweet spot for tablets
"crf_qp": 24,
"audio": "libopus",
"audio_bitrate": "128k"
}
```

## Testing Profiles

### A/B Quality Testing

Compare two profiles on same source:

```python
test_profiles = ["Balanced 1080p", "Custom Test"]
test_video = "/content/temp_downloads/test_clip.mkv"

for profile_name in test_profiles:
SELECTED_PROFILE = profile_name
encode_video(test_video, PROFILES[profile_name], USE_GPU)

# Compare output files
!ls -lh /content/temp_downloads/*_1080p.mkv
```

### Quick Test Workflow

Test on short clip (5-10 minutes):

```python
# Extract test clip from episode
!ffmpeg -i full_episode.mkv -t 600 -c copy test_clip.mkv

# Test various settings
# Check file size and quality
# Choose best settings
```

### Benchmark Speed

Test encoding speed:

```python
import time

start = time.time()
encode_video(test_file, profile, USE_GPU)
elapsed = time.time() - start

print(f"Encoding took: {elapsed:.1f} seconds")
```

## Advanced Customization

### Multiple Audio Tracks

Preserve multiple audio streams (requires code modification):

```python
# In encode_video function, modify:
"-map", "0:v",    # Map video
"-map", "0:a",    # Map all audio tracks
```

### Subtitle Handling

Already copies all subtitles by default:

```python
"-c:s", "copy"  # Copy all subtitle tracks
```

To remove subtitles:

```python
"-map", "0",
"-map", "-0:s"  # Exclude subtitles
```

### Custom Filters

Add video filters (requires code modification):

```python
# Example: Deband filter for heavily compressed sources
vf += ",gradfun=1.5"

# Example: Sharpen slightly
vf += ",unsharp=5:5:0.8:3:3:0.4"
```

### Two-Pass Encoding

For best quality (requires code modification):

```python
# Pass 1
cmd1 = ffmpeg_base + ["-pass", "1", "-f", "null", "/dev/null"]
subprocess.run(cmd1)

# Pass 2
cmd2 = ffmpeg_base + ["-pass", "2", output_path]
subprocess.run(cmd2)
```

## Profile Collections

### Create Profile Sets

Organize profiles by use case:

```python
# Quality-focused set
QUALITY_PROFILES = {
"Archive 1080p": {"height": 1080, "crf_qp": 18, ...},
"Archive 720p": {"height": 720, "crf_qp": 20, ...},
}

# Size-focused set
SIZE_PROFILES = {
"Small 1080p": {"height": 1080, "crf_qp": 28, ...},
"Small 720p": {"height": 720, "crf_qp": 30, ...},
}

# Merge into PROFILES
PROFILES.update(QUALITY_PROFILES)
PROFILES.update(SIZE_PROFILES)
```

## Troubleshooting Custom Profiles

### Output too large

```python
# Increase CRF (lower quality)
"crf_qp": 26  # Was 24

# Or reduce resolution
"height": 720  # Was 1080
```

### Quality not good enough

```python
# Decrease CRF (higher quality)
"crf_qp": 22  # Was 24

# Or use CPU encoding
USE_GPU = False
```

### Encoding fails

```python
# Check height is even number
"height": 720  # Good
"height": 721  # Bad (odd)

# Check CRF range
"crf_qp": 18-32  # Valid for NVENC
"crf_qp": 0-51   # Valid for x265
```

## Best Practices

1. **Start conservative**: Begin with lower CRF (better quality), then increase if needed
2. **Test on samples**: Use short clips before full episodes
3. **Document settings**: Keep notes on what works
4. **Name clearly**: Use descriptive profile names
5. **Consider source**: Higher quality source allows higher CRF
6. **Balance speed/quality**: GPU for speed, CPU for quality

## Profile Recipes

### For Different Sources

**Blu-ray rips (high quality source)**:

```python
"height": 1080,
"crf_qp": 24  # Can use higher CRF
```

**Web rips (medium quality)**:

```python
"height": 1080,
"crf_qp": 22  # Lower CRF to preserve quality
```

**Low quality source**:

```python
"height": 720,   # Downscale hides artifacts
"crf_qp": 24
```

---

Ready to create your perfect profile? Start experimenting!
