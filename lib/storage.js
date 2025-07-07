export function saveUser(username, password) { let users = JSON.parse(localStorage.getItem('users')) || []; users.push({ username, password }); localStorage.setItem('users', JSON.stringify(users)); }

export function getUser(username) { let users = JSON.parse(localStorage.getItem('users')) || []; return users.find(user => user.username === username); }

export function saveScore(username, score) { let scores = JSON.parse(localStorage.getItem('scores')) || []; scores.push({ username, score }); localStorage.setItem('scores', JSON.stringify(scores)); }

export function getLeaderboard() { let scores = JSON.parse(localStorage.getItem('scores')) || []; return scores.sort((a, b) => b.score - a.score).slice(0, 10); }
