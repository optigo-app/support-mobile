# Changelog

## [2026-03-23]

### Added
- **Tab-Based Routing with URL Binding**: Each tab in the navigation now has a corresponding URL query parameter (`?tab=N`). This enables full support for the browser/mobile back button and deep linking.
- **"Week" Filter in Header**: Added a "Week" filter option to the header in Call Logs, Tickets, Orders, and Training tabs.
- **Ticket Detail UI**: Fixed text wrapping issue in the ticket details drawer for long "Created on..." descriptions.

### Fixed
- **Navigation Flickering**: Resolved an infinite loop issue where the tab state and URL were competing for control.
