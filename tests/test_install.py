#!/usr/bin/env python3
"""
Tests for install.mjs script
"""
import subprocess
import tempfile
import os
from pathlib import Path


def test_install_script_exists():
    """Test that install.mjs exists and is executable"""
    script_path = Path(__file__).parent.parent / 'scripts' / 'install.mjs'
    assert script_path.exists(), "scripts/install.mjs should exist"
    assert os.access(script_path, os.X_OK), "scripts/install.mjs should be executable"


def test_install_script_runs():
    """Test that install.mjs runs and creates target structure"""
    root = Path(__file__).parent.parent
    script = root / 'scripts' / 'install.mjs'

    with tempfile.TemporaryDirectory() as tmpdir:
        target = Path(tmpdir) / 'test-install'

        result = subprocess.run(
            ['node', str(script), str(target)],
            capture_output=True,
            text=True,
            cwd=root
        )

        assert result.returncode == 0, f"Install failed: {result.stderr}"
        assert target.exists(), "Target directory should be created"
        assert (target / 'package.json').exists(), "package.json should be copied"
        assert (target / 'backend' / 'main.py').exists(), "backend/main.py should be copied"
        assert (target / 'frontend' / 'src' / 'App.tsx').exists(), "frontend/src/App.tsx should be copied"
        assert (target / '.install-manifest.json').exists(), "Install manifest should be created"

        # Verify manifest content
        import json
        manifest = json.loads((target / '.install-manifest.json').read_text())
        assert manifest['name'] == 'nexus-console-145'
        assert manifest['files'] > 0


def test_install_validates_source():
    """Test that install.mjs validates source structure"""
    root = Path(__file__).parent.parent
    script = root / 'scripts' / 'install.mjs'

    with tempfile.TemporaryDirectory() as tmpdir:
        target = Path(tmpdir) / 'test-install'

        # Temporarily remove a required file
        package_json = root / 'package.json'
        backup = root / 'package.json.bak'
        package_json.rename(backup)

        try:
            result = subprocess.run(
                ['node', str(script), str(target)],
                capture_output=True,
                text=True,
                cwd=root
            )

            assert result.returncode != 0, "Should fail with missing package.json"
            assert 'Missing required files' in result.stderr
        finally:
            if backup.exists():
                backup.rename(package_json)


if __name__ == '__main__':
    test_install_script_exists()
    test_install_script_runs()
    test_install_validates_source()
    print('All tests passed!')