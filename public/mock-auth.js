// Mock Auth System for AIToolGuide
// This is a temporary implementation until real auth is integrated
// Created: 2026-03-24
// Status: Active - Awaiting real Clerk/Kinde integration

(function() {
  'use strict';

  const AUTH_KEY = 'aitg_auth';
  const USER_KEY = 'aitg_user';

  const MockAuth = {
    // Check if user is logged in
    isAuthenticated() {
      return localStorage.getItem(AUTH_KEY) === 'true';
    },

    // Get current user
    getUser() {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    },

    // Sign in with Google (mock)
    signInWithGoogle() {
      // Simulate Google OAuth flow
      const mockUser = {
        id: 'mock_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Test User',
        avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      
      // Trigger event
      window.dispatchEvent(new CustomEvent('auth:login', { detail: mockUser }));
      
      return mockUser;
    },

    // Sign out
    signOut() {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(USER_KEY);
      window.dispatchEvent(new CustomEvent('auth:logout'));
    },

    // Initialize auth UI
    init() {
      this.updateUI();
      
      // Listen for storage changes (for multi-tab sync)
      window.addEventListener('storage', (e) => {
        if (e.key === AUTH_KEY) {
          this.updateUI();
        }
      });
    },

    // Update UI based on auth state
    updateUI() {
      const isAuth = this.isAuthenticated();
      const user = this.getUser();
      
      // Update all auth elements
      document.querySelectorAll('[data-auth="signed-in"]').forEach(el => {
        el.style.display = isAuth ? '' : 'none';
      });
      
      document.querySelectorAll('[data-auth="signed-out"]').forEach(el => {
        el.style.display = isAuth ? 'none' : '';
      });
      
      // Update user info
      if (user) {
        document.querySelectorAll('[data-user="name"]').forEach(el => {
          el.textContent = user.name;
        });
        document.querySelectorAll('[data-user="avatar"]').forEach(el => {
          el.src = user.avatar;
        });
      }
    }
  };

  // Expose to global
  window.MockAuth = MockAuth;

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MockAuth.init());
  } else {
    MockAuth.init();
  }
})();
