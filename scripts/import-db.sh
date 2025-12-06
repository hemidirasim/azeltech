#!/bin/bash

# Database import script
# Usage: ./scripts/import-db.sh <backup_file.dump>

if [ -z "$1" ]; then
  echo "Usage: ./scripts/import-db.sh <backup_file.dump>"
  exit 1
fi

echo "Importing database from $1..."

# PostgreSQL import
pg_restore -h localhost -p 5432 -U azer -d azeltech -c $1

echo "Database imported successfully!"




