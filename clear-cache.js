// Cache Clearing Script for SUGGESTLY ELITE
// Run this in browser console to clear cache and force refresh

console.log('🧹 Clearing SUGESTLY ELITE cache...');

// Clear localStorage
localStorage.clear();
console.log('✅ localStorage cleared');

// Clear sessionStorage
sessionStorage.clear();
console.log('✅ sessionStorage cleared');

// Clear all caches
if ('caches' in window) {
  caches.keys().then(function (names) {
    for (let name of names) {
      caches.delete(name);
    }
    console.log('✅ Service worker caches cleared');
  });
}

// Force reload without cache
console.log('🔄 Reloading page without cache...');
window.location.reload(true);

// Alternative method if above doesn't work
setTimeout(() => {
  console.log('🔄 Force reloading...');
  window.location.href = window.location.href + '?v=' + Date.now();
}, 1000);


