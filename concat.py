import glob
import re
import os

def natural_sort(l): 
  convert = lambda text: int(text) if text.isdigit() else text.lower() 
  alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key) ] 
  return sorted(l, key = alphanum_key)

video_list = glob.glob("*.ts")
sorted_list = natural_sort(video_list)

output_name = input("What should be the output file name? (combined.ts)\n") or "combined.ts"
should_remove = input("Remove all original ts files? (y/N)\n").lower() in ('y','yes')

with open(output_name, "wb") as outputf:
  for input in sorted_list:
    with open(input, "rb") as inputf:
      outputf.write(inputf.read())

if should_remove:
  for file in sorted_list:
    os.remove(file)