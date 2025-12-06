#!/bin/bash

# Database export script
# Usage: ./scripts/export-db.sh

echo "Exporting database..."

# PostgreSQL export
pg_dump -h localhost -p 5432 -U azer -d azeltech -F c -f backup_$(date +%Y%m%d_%H%M%S).dump

echo "Database exported successfully!"
echo "To restore: pg_restore -h localhost -p 5432 -U azer -d azeltech backup_*.dump"




