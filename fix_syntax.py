with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

content = content.replace("  }\n  {", "  },\n  {")

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
