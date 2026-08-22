import React, { useState, useEffect } from 'react';
import presets from '../utils/presets';
import './PresetSelector.css';

const PresetSelector = ({ onSelect, selectedPreset, type = 'photo' }) => {
  const [activeCategory, setActiveCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredPresets, setFilteredPresets] = useState([]);

  useEffect(() => {
    let available = presets;
    if (type === 'signature') {
      available = presets.filter((p) => p.signature != null);
    }

    const cats = [...new Set(available.map((p) => p.category))];
    setCategories(cats);

    if (cats.length > 0) {
      setActiveCategory((prev) => (cats.includes(prev) ? prev : cats[0]));
    }
  }, [type]);

  useEffect(() => {
    let available = presets;
    if (type === 'signature') {
      available = presets.filter((p) => p.signature != null);
    }
    setFilteredPresets(available.filter((p) => p.category === activeCategory));
  }, [activeCategory, type]);

  const getDimsLabel = (preset) => {
    if (type === 'photo' && preset.photo) {
      const { width, height, maxSize } = preset.photo;
      return `${width}×${height} px · max ${maxSize} KB`;
    }
    if (type === 'signature' && preset.signature) {
      const { width, height, maxSize } = preset.signature;
      return `${width}×${height} px · max ${maxSize} KB`;
    }
    return '';
  };

  return (
    <div className="preset-selector">
      <div className="preset-categories" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="preset-grid">
        {filteredPresets.map((preset) => (
          <button
            type="button"
            key={preset.id}
            className={`preset-card ${selectedPreset?.id === preset.id ? 'selected' : ''}`}
            onClick={() => onSelect(preset)}
          >
            <div className="preset-icon" aria-hidden="true">
              {preset.icon || '📄'}
            </div>
            <div className="preset-info">
              <h4 className="preset-name">{preset.name}</h4>
              <p className="preset-dimensions">{getDimsLabel(preset)}</p>
            </div>
            {selectedPreset?.id === preset.id && (
              <div className="preset-check" aria-hidden="true">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetSelector;
