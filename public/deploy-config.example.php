<?php
// Copy this file to deploy-config.php (same folder) and set a real random token, then upload
// deploy-config.php to the server MANUALLY (over FTP) — it is gitignored and never travels
// through the GitHub Actions deploy, same pattern as lead-config.php. Generate a token with
// e.g. `openssl rand -hex 32` and set it as the DEPLOY_TOKEN secret in GitHub too.

define('DEPLOY_TOKEN', '');
