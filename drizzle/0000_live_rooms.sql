CREATE TABLE qc_rooms (code TEXT PRIMARY KEY NOT NULL, host TEXT NOT NULL, config TEXT NOT NULL, phase TEXT NOT NULL DEFAULT 'lobby', snapshot TEXT NOT NULL DEFAULT '{}', created INTEGER NOT NULL, updated INTEGER NOT NULL);
--> statement-breakpoint
CREATE TABLE qc_peers (token TEXT PRIMARY KEY NOT NULL, room TEXT NOT NULL, name TEXT NOT NULL, hero TEXT NOT NULL, level INTEGER NOT NULL, state TEXT NOT NULL DEFAULT '{}', updated INTEGER NOT NULL);
--> statement-breakpoint
CREATE INDEX qc_peers_room ON qc_peers(room);
