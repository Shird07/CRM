# CRM Implementation Plan - Phase 1 & 2

## Phase 1: Admin Responsibilities
- [ ] Create `Admin/SalesController` with `store`, `update`, `destroy`.
- [ ] Ensure historical data (`region_id`) in `prospeks` is not affected when a sales region changes.
- [ ] Add routes for `Admin/SalesController` in `routes/web.php`.
- [ ] Implement Modals for Create and Edit Sales in `resources/js/Pages/Admin/Dashboard.jsx`.
- [ ] Modify `AdminDashboardController` to return `recentWins` for polling.
- [ ] Add Frontend Polling logic in `Admin/Dashboard.jsx` to fetch recent wins and show a notification.

## Phase 2: Middleware
- [ ] Create migration to add `no_hp`, `alamat`, and `nik` to `users` table (if they don't exist).
- [ ] Create `CheckProfileCompletion` middleware.
- [ ] Apply middleware to `sales.*` routes in `routes/web.php`.
- [ ] Ensure the `/profile` edit page allows the user to update these fields.
