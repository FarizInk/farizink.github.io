#!/bin/bash

# Script to delete .js and .js.map files in src folder and subfolders
# Usage: ./clean-js.sh

echo "🧹 Cleaning JavaScript compilation files..."

# Check if src folder exists
if [ ! -d "src" ]; then
    echo "❌ Error: src folder not found!"
    exit 1
fi

# Counter for deleted files
deleted_count=0

echo "📁 Searching for .js files in src folder..."

# Delete .js files in src and subfolders (recursive)
while IFS= read -r -d '' file; do
    echo "🗑️  Deleting: $file"
    rm "$file"
    ((deleted_count++))
done < <(find src -type f -name "*.js" -print0)

echo "📁 Searching for .js.map files in src folder..."

# Delete .js.map files in src and subfolders (recursive)
while IFS= read -r -d '' file; do
    echo "🗑️  Deleting: $file"
    rm "$file"
    ((deleted_count++))
done < <(find src -type f -name "*.js.map" -print0)

echo "✅ Cleanup complete!"
echo "📊 Total files deleted: $deleted_count"

if [ $deleted_count -eq 0 ]; then
    echo "💡 No .js or .js.map files found in src folder."
fi