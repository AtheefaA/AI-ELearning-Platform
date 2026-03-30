import React, { useState } from "react";
import "./PageStyle.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "Atheefa ❤️",
    email: "atheefa@example.com",
    notifications: true,
    timezone: "Colombo",
    language: "English",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
    setSaved(false);
  };

  const handleSave = () => {
    // Here you could connect to backend API later
    setSaved(true); // show success message in page
  };

  return (
    <div className="page-full-center">
      <div className="page-container">
        <h2>Account Settings ⚙️</h2>
        <p className="page-subtitle">
          Manage your account preferences and privacy settings
        </p>

        <div className="page-content settings-content">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={settings.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              Enable Email Notifications
            </label>
          </div>

          <div className="form-group">
            <label>Timezone</label>
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="dropdown"
            >
              <option value="Colombo">Colombo (GMT +5:30)</option>
              <option value="London">London (GMT +0)</option>
              <option value="New York">New York (GMT -5)</option>
              <option value="Tokyo">Tokyo (GMT +9)</option>
              <option value="Dubai">Dubai (GMT +4)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="dropdown"
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          <button className="btn-submit" onClick={handleSave}>
            Save Changes
          </button>

          {/* ✅ Inline success message (no alert) */}
          {saved && (
            <p className="success-msg">
              ✅ Your settings have been saved successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
