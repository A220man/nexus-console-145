#!/usr/bin/env python3
"""
Tests for FastAPI backend
"""
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))
from main import app

client = TestClient(app)


def test_health_endpoint():
    """Test /health endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.json()
    assert data['status'] == 'ok'
    assert 'version' in data


def test_list_themes_endpoint():
    """Test /api/themes endpoint"""
    response = client.get('/api/themes')
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for theme in data:
        assert 'id' in theme
        assert 'name' in theme
        assert 'genre' in theme
        assert 'description' in theme


def test_deal_themes_endpoint():
    """Test /api/themes/deal endpoint"""
    response = client.post('/api/themes/deal')
    assert response.status_code == 200
    data = response.json()
    assert 'themes' in data
    assert len(data['themes']) == 3
    assert 'genre' in data


def test_deal_themes_with_genre():
    """Test /api/themes/deal with genre filter"""
    response = client.post('/api/themes/deal?genre=minimal')
    assert response.status_code == 200
    data = response.json()
    assert 'themes' in data
    assert len(data['themes']) == 3


if __name__ == '__main__':
    test_health_endpoint()
    test_list_themes_endpoint()
    test_deal_themes_endpoint()
    test_deal_themes_with_genre()
    print('All backend tests passed!')