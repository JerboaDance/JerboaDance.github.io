#!/bin/bash

# Script to rename show files to lowercase using git mv
# This ensures Git properly tracks the rename on case-insensitive filesystems

cd "$(dirname "$0")/.."

echo "Renaming performance files to lowercase..."

# Array of files to rename (Title Case -> lowercase)
declare -a files=(
  "Flux:flux"
  "AnimalNature:animalnature"
  "BackFromTheBrink:backfromthebrink"
  "Delirium:delirium"
  "Embrace:embrace"
  "Fractured:fractured"
  "GenderallySpeaking:genderallyspeaking"
  "Luminous:luminous"
  "Moxie:moxie"
  "NoMatter:nomatter"
  "Transformation:transformation"
  "Unhinge:unhinge"
  "Reconstruct:reconstruct"
)

for file_pair in "${files[@]}"; do
  IFS=':' read -r old new <<< "$file_pair"
  old_file="docs/performances/${old}.html"
  new_file="docs/performances/${new}.html"
  
  if [ -f "$old_file" ]; then
    echo "  Renaming $old_file -> $new_file"
    git mv "$old_file" "$new_file"
  else
    echo "  Skipping $old_file (not found)"
  fi
done

echo "✅ Rename complete! Now regenerate the show pages with:"
echo "   node tools/generateShowStubs.cjs"