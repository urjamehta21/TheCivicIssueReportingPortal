const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');

test('server env provides the JWT secret and demo admin credentials expected by the sign-in flow', () => {
  const envPath = path.join(__dirname, '..', '.env');
  const env = fs.readFileSync(envPath, 'utf8');

  assert.match(env, /JWT_SECRET=/, 'JWT_SECRET is missing from server/.env');
  assert.match(env, /ADMIN_EMAIL=admin@nagarsetu.com/, 'Default admin email does not match the sign-in demo credentials');
  assert.match(env, /ADMIN_PASSWORD=Admin@123/, 'Default admin password does not match the sign-in demo credentials');
});

test('server accepts large image payloads for citizen reports', () => {
  const serverPath = path.join(__dirname, '..', 'server.js');
  const serverCode = fs.readFileSync(serverPath, 'utf8');

  assert.match(serverCode, /express\.json\(\{\s*limit:\s*['"]25mb['"]\s*\}\)/s, 'JSON body parser limit is too small for image uploads');
  assert.match(serverCode, /express\.urlencoded\(\{\s*extended:\s*true,\s*limit:\s*['"]25mb['"]\s*\}\)/s, 'URL-encoded parser limit is too small for image uploads');
});
