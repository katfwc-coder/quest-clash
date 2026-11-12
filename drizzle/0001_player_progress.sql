CREATE TABLE qc_accounts (username TEXT PRIMARY KEY NOT NULL, salt TEXT NOT NULL, password_hash TEXT NOT NULL, profile TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1, updated INTEGER NOT NULL);
--> statement-breakpoint
CREATE TABLE qc_account_sessions (token_hash TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL REFERENCES qc_accounts(username) ON DELETE CASCADE, expires INTEGER NOT NULL);
--> statement-breakpoint
CREATE INDEX qc_account_session_expiry ON qc_account_sessions(expires);
--> statement-breakpoint
CREATE TABLE qc_auth_limits (key TEXT PRIMARY KEY NOT NULL, attempts INTEGER NOT NULL, expires INTEGER NOT NULL);
