# Personal blog of Sanjay Sharma

Popularly known as Sanjay Ujjaini

[![Netlify Status](https://api.netlify.com/api/v1/badges/dbc3d738-c943-4eea-ac60-b3df52c95b2a/deploy-status)](https://app.netlify.com/sites/photoarts/deploys)

## Admin interface

- Netlify cms is used for admin interface. It saves content in the git repo rather than in any db.
- git repo access is required to edit those contents.

## Handling Images

### Transformation

- Extract thumnail images from larger images by uploading to cloudinary and then using url transformation methods to download thumbnail in required height and weight.

### Compression

- Use of tinypng or tinyjpg to compress the images before uploading them on the admin panel or on cloudinary.
