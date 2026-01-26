# Frequently Asked Questions

Common questions about the Anime FFmpeg Re-Encoder.

## General Questions

### What is this project?

An automated workflow for encoding anime videos on Google Colab with professional-grade settings. Download torrents, encode with HEVC 10-bit, and upload to Google Drive automatically.

### Is it free?

Yes! Google Colab has a free tier with GPU access. Colab Pro is optional for longer runtimes and better GPUs.

### Do I need to install anything?

No! Everything runs in Google Colab's cloud environment. You just need a Google account.

### What makes this good for anime?

- HEVC 10-bit encoding preserves gradients (prevents banding)
- Pre-tuned settings for anime content
- Opus audio codec (better than AAC)
- Balanced quality/size ratios
- Fast GPU encoding

## Encoding Questions

### Which profile should I use?

**Most users**: Start with **Balanced 1080p**

- Archive/collect: High Quality 1080p
- General watching: Balanced 1080p
- Limited space: Small 720p
- Mobile only: Mobile 480p

See [Profiles Guide](profiles.md) for detailed comparison.

### GPU or CPU encoding?

**Use GPU (NVENC)** for:

- Fast encoding (5-10x speed)
- Good quality
- Most use cases

**Use CPU (x265)** for:

- Best quality (archival)
- When GPU unavailable
- You have time to wait

### How long does encoding take?

For a 24-minute 1080p anime episode on T4 GPU:

- Download: 2-10 min (varies by seeders)
- Encode: 3-5 min
- Upload: 1-2 min
- **Total**: ~6-17 minutes

CPU encoding: 20-30 minutes

### What file size should I expect?

For 24-minute episode:

| Profile | Size | Compression |
|---------|------|-------------|
| High Quality 1080p | ~800 MB | Best quality |
| Balanced 1080p | ~650 MB | Recommended |
| Small 720p | ~400 MB | Great ratio |
| Mobile 480p | ~250 MB | Phone-friendly |
| Mobile 360p | ~150 MB | Maximum save |

Compared to typical H.264 8-bit (1.4 GB), saves 30-50%.

### Will quality be worse than original?

Depends on settings:

- **High Quality 1080p**: Near-transparent, minimal loss
- **Balanced 1080p**: Imperceptible for most anime
- **Small 720p**: Noticeable on large screens, fine on laptops
- **Mobile**: Visible quality loss, acceptable on small screens

HEVC 10-bit at same bitrate looks better than H.264 8-bit.

### What's better: HEVC or H.264?

HEVC (H.265) for anime:

- 30-50% smaller files at same quality
- 10-bit color depth (prevents banding)
- Better for animation
- Modern codec (widely supported now)

Stick with H.264 only if you need maximum compatibility with old devices.

### Can I preserve original quality?

Yes, with caveats:

- Use "High Quality 1080p" profile
- Use CPU encoding (x265)
- Set CRF 18-20 for near-lossless
- But file will still be smaller than source

True lossless is possible but defeats the purpose (files would be huge).

## Technical Questions

### What codecs are used?

**Video**:

- GPU: hevc_nvenc (NVIDIA hardware encoder)
- CPU: libx265 (software encoder)
- Both output HEVC (H.265) 10-bit

**Audio**:

- Opus (default, recommended)
- AAC (optional)
- Copy (no re-encoding)

**Container**: MKV (Matroska)

### What's the difference between NVENC and x265?

| Feature | NVENC (GPU) | x265 (CPU) |
|---------|-------------|------------|
| Speed | 5-10x faster | Slower |
| Quality | Very good | Better |
| Efficiency | Good | Better compression |
| CPU usage | Low | High |
| Cost | Free on Colab | Free on Colab |

For most users, NVENC quality is sufficient.

### Why 10-bit encoding?

10-bit color depth:

- Prevents banding in gradients (sky, lighting)
- Better color accuracy
- Actually compresses better than 8-bit
- Standard for high-quality anime encodes

Very important for anime with lots of gradients and smooth colors.

### Does this work with non-anime?

Yes! The settings work great for:

- Animation (Western cartoons, CG)
- Screen recordings
- Gaming videos
- Any content with gradients

Might need adjustment for live-action (less optimal for film grain).

### Can I customize settings?

Yes! See:

- [Configuration Guide](configuration.md) - All settings
- [Custom Profiles](advanced/custom-profiles.md) - Create your own presets

## Workflow Questions

### Can I process multiple files?

Yes! Two ways:

1. **Download season pack**: Torrent with multiple episodes
2. **Manual batch**: Place files in temp folder

Workflow encodes latest file. For true batch processing, see [Batch Processing Guide](advanced/batch-processing.md).

### Can I skip download and just encode?

Yes:

```python
ENABLE_DOWNLOAD = False
ENABLE_ENCODE = True

# Place your files in /content/temp_downloads/
# Workflow will encode latest video
```

### Where do files go?

**During processing**: `/content/temp_downloads/` (Colab storage)

**Final output**: Google Drive folder (configurable):

```python
DRIVE_OUTPUT_FOLDER = "/content/drive/MyDrive/Anime/Downloads"
```

### What happens to original files?

- Downloaded files stay in `/content/temp_downloads/`
- Deleted when runtime disconnects
- Originals are not touched (read-only)
- Encoded files go to Drive

To cleanup:

```python
!rm -rf /content/temp_downloads/*
```

### Can I seed torrents?

Yes:

```python
ARIA2_SEED_TIME = 3600  # Seed for 1 hour
```

Default is 0 (no seeding). Set to desired seconds.

### What's auto-shutdown?

When enabled, runtime disconnects after successful upload:

```python
ENABLE_AUTO_SHUTDOWN = True
SHUTDOWN_DELAY = 10  # Seconds delay
```

Saves Colab compute units. Disable for batch processing.

## Colab Questions

### What's the difference between Free and Pro?

| Feature | Free | Pro |
|---------|------|-----|
| Runtime | ~12 hours | ~24 hours |
| GPU | T4 (usually) | V100/A100 |
| Priority | Low | High |
| RAM | ~12 GB | ~25 GB |
| Price | Free | $10/month |

Pro is faster and more reliable, but free works fine for most use.

### How long can I run?

**Free tier**:

- ~12 hours maximum runtime
- Disconnects after 90 minutes idle
- Usage limits (can't run 24/7)

**Pro tier**:

- ~24 hours maximum runtime
- Less likely to disconnect
- Higher usage limits

### What if I exceed limits?

Free tier:

- "You have reached your usage limit"
- Wait 12-24 hours for reset
- Upgrade to Pro
- Use CPU-only runtime (less restricted)

### Can I run this 24/7?

No. Colab is not for continuous operation:

- Free tier: Definitely not
- Pro tier: Not recommended

For 24/7 encoding, use a VPS or local machine.

### Is my data safe?

- Google Colab is secure
- Files only in your temp folder and Drive
- No one else can access your runtime
- Standard Google security applies

### Can I use shared Drive folders?

Yes:

```python
DRIVE_OUTPUT_FOLDER = "/content/drive/Shareddrives/TeamName/Folder"
```

Mount shared drive same as personal Drive.

## Storage Questions

### How much storage do I need?

**Google Drive**:

- Plan for final output size
- Balanced 1080p: ~650 MB per episode
- 12-episode season: ~8 GB

**Colab temp storage**:

- Free: ~100 GB
- Pro: ~200 GB
- Enough for most batches

### What if I run out of space?

**Drive full**:

- Free up space in Drive
- Use smaller profile
- Upload elsewhere (see advanced guides)

**Temp full**:

```python
!rm -rf /content/temp_downloads/*
```

### Can I output to other cloud storage?

Not directly, but possible:

- Encode normally to temp folder
- Use rclone to upload to other services
- See advanced guides (coming soon)

## Quality Concerns

### Why is output larger than source?

Possible causes:

- Source was already heavily compressed
- Using too low CRF (better quality)
- Source resolution lower than target

Solution:

- Check source resolution first
- Use same or lower resolution
- Increase CRF if needed

### Why is output smaller than expected?

- Efficient compression (good!)
- HEVC is very efficient for anime
- 10-bit compresses better than expected
- This is normal

### Video won't play on my device

HEVC 10-bit requires:

- Modern device (2016+)
- Hardware decoder (most devices have it)
- Updated media player (VLC works)

If not supported:

- Use H.264 8-bit instead (requires customization)
- Upgrade device/player
- Use 8-bit HEVC (requires customization)

### Subtitles missing

Subtitles should copy:

```python
"-c:s", "copy"  # In encoding command
```

If missing:

- Check source has subtitles
- Some formats not supported
- Try remuxing separately

## Support Questions

### Where can I get help?

1. Check this FAQ
2. See [Troubleshooting Guide](troubleshooting.md)
3. Read relevant docs section
4. Open GitHub issue

### How do I report bugs?

On GitHub:

- Include error message
- Specify Free/Pro tier
- GPU type
- Profile used
- Steps to reproduce

### Can I contribute?

Yes! This is open source:

- Fork repository
- Submit pull requests
- Improve documentation
- Share profiles

### Is commercial use allowed?

Check license, but generally:

- Tool itself: Yes (open source)
- Encoded content: Depends on source content license
- Don't redistribute copyrighted anime without permission

## Misc Questions

### Why Google Colab?

Advantages:

- Free GPU access
- No local setup required
- Good for cloud workflow
- Integrates with Drive

Disadvantages:

- Usage limits
- Not 24/7
- Internet required

### Can I run locally instead?

Yes! The notebook uses standard tools:

- FFmpeg
- aria2
- Python

Can adapt to run on local machine or VPS.

### Does this work in other notebooks?

The workflow should work in:

- Jupyter Notebook
- JupyterLab
- Kaggle Notebooks (with modifications)
- Local Python environment

Colab-specific: Drive mounting, GPU allocation.

### What anime sources are legal?

**Legal**:

- Official streams you have access to
- Purchased Blu-rays/DVDs
- Licensed content you own

**Illegal**:

- Pirated content
- Unauthorized torrents
- Ripped streams from paid services

Use responsibly and legally!

---

**More questions?** Check other docs sections or ask on GitHub!
