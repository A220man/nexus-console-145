#!/usr/bin/env python3
"""
Tests for theme system
"""
import subprocess
import json
import tempfile
import os
from pathlib import Path


def run_theme_command(args, cwd=None):
    """Run theme.mjs with given args and return result"""
    root = Path(__file__).parent.parent
    script = root / 'scripts' / 'theme.mjs'
    cmd = ['node', str(script)] + args
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd or root)
    return result


def test_theme_index_exists():
    """Test that theme index file exists and is valid JSON"""
    root = Path(__file__).parent.parent
    index_file = root / 'references' / 'themes' / 'index.json'
    assert index_file.exists(), "Theme index file should exist"

    with open(index_file) as f:
        index = json.load(f)

    assert 'version' in index, "Index should have version"
    assert 'themes' in index, "Index should have themes array"
    assert len(index['themes']) >= 6, "Should have at least 6 themes"

    # Check each theme has required fields
    for theme in index['themes']:
        assert 'id' in theme, "Theme should have id"
        assert 'name' in theme, "Theme should have name"
        assert 'genre' in theme, "Theme should have genre"
        assert 'description' in theme, "Theme should have description"
        assert 'file' in theme, "Theme should have file"
        assert theme['genre'] in ['clean', 'expressive', 'technical'], f"Invalid genre: {theme['genre']}"


def test_theme_files_exist():
    """Test that all theme files referenced in index exist"""
    root = Path(__file__).parent.parent
    index_file = root / 'references' / 'themes' / 'index.json'

    with open(index_file) as f:
        index = json.load(f)

    for theme in index['themes']:
        theme_file = root / 'references' / 'themes' / theme['file']
        assert theme_file.exists(), f"Theme file {theme['file']} should exist"


def test_theme_list_command():
    """Test theme list command"""
    result = run_theme_command(['list'])
    assert result.returncode == 0, f"Theme list failed: {result.stderr}"
    assert 'Available Themes' in result.stdout
    assert 'clean-minimal' in result.stdout
    assert 'editorial-magazine' in result.stdout
    assert 'technical-docs' in result.stdout
    assert 'warm-organic' in result.stdout
    assert 'dark-mode-first' in result.stdout
    assert 'brutalist' in result.stdout


def test_theme_deal_command():
    """Test theme deal command (no genre)"""
    result = run_theme_command(['deal'])
    assert result.returncode == 0, f"Theme deal failed: {result.stderr}"
    assert 'Dealt 3 theme' in result.stdout


def test_theme_deal_with_genre():
    """Test theme deal command with genre filter"""
    result = run_theme_command(['deal', 'clean'])
    assert result.returncode == 0, f"Theme deal with genre failed: {result.stderr}"
    assert 'Dealt 1 theme' in result.stdout or 'Dealt 2 theme' in result.stdout or 'Dealt 3 theme' in result.stdout
    assert 'clean' in result.stdout.lower()


def test_theme_deal_invalid_genre():
    """Test theme deal with invalid genre"""
    result = run_theme_command(['deal', 'invalid-genre'])
    assert result.returncode == 0, "Should not error on invalid genre"
    assert 'No themes found for genre' in result.stdout


def test_theme_draw_command():
    """Test theme draw command"""
    result = run_theme_command(['draw', 'landing page with hero features testimonials pricing'])
    assert result.returncode == 0, f"Theme draw failed: {result.stderr}"
    assert 'Page Sections' in result.stdout
    assert 'Components' in result.stdout
    assert 'Patterns' in result.stdout


def test_theme_draw_dashboard():
    """Test theme draw for dashboard"""
    result = run_theme_command(['draw', 'admin dashboard with sidebar data table metrics'])
    assert result.returncode == 0, f"Theme draw dashboard failed: {result.stderr}"
    assert 'Dashboard' in result.stdout
    assert 'Sidebar' in result.stdout
    assert 'Data Table' in result.stdout


def test_theme_scaffold_command():
    """Test theme scaffold command"""
    with tempfile.TemporaryDirectory() as tmpdir:
        result = run_theme_command(['scaffold', 'clean-minimal'], cwd=tmpdir)
        assert result.returncode == 0, f"Theme scaffold failed: {result.stderr}"
        assert 'Generated tokens.css' in result.stdout
        assert 'Generated base.css' in result.stdout

        # Check files were created
        output_dir = Path(tmpdir) / 'theme-output' / 'clean-minimal'
        assert output_dir.exists(), "Output directory should exist"
        assert (output_dir / 'tokens.css').exists(), "tokens.css should exist"
        assert (output_dir / 'base.css').exists(), "base.css should exist"

        # Verify tokens.css has CSS custom properties
        tokens_css = (output_dir / 'tokens.css').read_text()
        assert ':root {' in tokens_css
        assert '--colors-color-bg:' in tokens_css
        assert '--colors-color-fg:' in tokens_css
        assert '--typography-font-sans:' in tokens_css
    result = run_theme_command(['scaffold', 'invalid-theme'])
    assert result.returncode != 0, "Should fail with invalid theme"
    assert 'Theme not found' in result.stderr


def test_theme_validate_command():
    """Test theme validate command"""
    result = run_theme_command(['validate', 'clean-minimal.md'])
    assert result.returncode == 0, f"Theme validate failed: {result.stderr}"
    assert 'Theme validation passed' in result.stdout


def test_theme_validate_all_themes():
    """Test theme validate for all themes"""
    root = Path(__file__).parent.parent
    index_file = root / 'references' / 'themes' / 'index.json'

    with open(index_file) as f:
        index = json.load(f)

    for theme in index['themes']:
        result = run_theme_command(['validate', theme['file']])
        assert result.returncode == 0, f"Theme validate failed for {theme['file']}: {result.stderr}"
        assert 'Theme validation passed' in result.stdout


def test_theme_validate_invalid_file():
    """Test theme validate with non-existent file"""
    result = run_theme_command(['validate', 'nonexistent.md'])
    assert result.returncode != 0, "Should fail with non-existent file"
    assert 'Theme file not found' in result.stderr


def test_tokens_css_structure():
    """Test that generated tokens.css has proper structure"""
    with tempfile.TemporaryDirectory() as tmpdir:
        result = run_theme_command(['scaffold', 'clean-minimal'], cwd=tmpdir)
        assert result.returncode == 0

        output_dir = Path(tmpdir) / 'theme-output' / 'clean-minimal'
        tokens_css = (output_dir / 'tokens.css').read_text()

        # Should have :root block
        assert tokens_css.startswith(':root {')
        assert tokens_css.endswith('}\n')

        # Should have color tokens
        assert '--colors-color-bg:' in tokens_css
        assert '--colors-color-fg:' in tokens_css
        assert '--colors-color-primary:' in tokens_css

        # Should have typography tokens
        assert '--typography-font-sans:' in tokens_css
        assert '--typography-text-base:' in tokens_css

        # Should have spacing tokens
        assert '--spacing-space-4:' in tokens_css


def test_base_css_structure():
    """Test that generated base.css has proper structure"""
    with tempfile.TemporaryDirectory() as tmpdir:
        result = run_theme_command(['scaffold', 'clean-minimal'], cwd=tmpdir)
        assert result.returncode == 0

        output_dir = Path(tmpdir) / 'theme-output' / 'clean-minimal'
        base_css = (output_dir / 'base.css').read_text()

        # Should have reset
        assert 'box-sizing: border-box' in base_css

        # Should have body styles
        assert 'body {' in base_css
        assert 'font-family:' in base_css
        assert 'color:' in base_css
        assert 'background-color:' in base_css

        # Should have button styles
        assert '.btn {' in base_css
        assert '.btn-primary {' in base_css

        # Should have input styles
        assert '.input {' in base_css

        # Should have card styles
        assert '.card {' in base_css

        # Should have reduced motion media query
        assert 'prefers-reduced-motion: reduce' in base_css


def test_theme_file_parsing():
    """Test that theme markdown files can be parsed for tokens"""
    root = Path(__file__).parent.parent
    index_file = root / 'references' / 'themes' / 'index.json'

    with open(index_file) as f:
        index = json.load(f)

    for theme in index['themes']:
        theme_file = root / 'references' / 'themes' / theme['file']
        content = theme_file.read_text()

        # Should have all required sections
        assert '## Colors' in content or '## Design Tokens' in content
        assert '## Typography' in content
        assert '## Spacing' in content
        assert '## Radii' in content
        assert '## Shadows' in content
        assert '## Transitions' in content
        assert '## Component Tokens' in content or '## Component' in content
        assert '## Usage Notes' in content


if __name__ == '__main__':
    import sys

    tests = [
        test_theme_index_exists,
        test_theme_files_exist,
        test_theme_list_command,
        test_theme_deal_command,
        test_theme_deal_with_genre,
        test_theme_deal_invalid_genre,
        test_theme_draw_command,
        test_theme_draw_dashboard,
        test_theme_scaffold_command,
        test_theme_scaffold_invalid_theme,
        test_theme_validate_command,
        test_theme_validate_all_themes,
        test_theme_validate_invalid_file,
        test_tokens_css_structure,
        test_base_css_structure,
        test_theme_file_parsing,
    ]

    failed = 0
    for test in tests:
        try:
            test()
            print(f'✅ {test.__name__}')
        except Exception as e:
            print(f'❌ {test.__name__}: {e}')
            failed += 1

    if failed:
        print(f'\n{failed} test(s) failed')
        sys.exit(1)
    else:
        print('\n✅ All tests passed!')
