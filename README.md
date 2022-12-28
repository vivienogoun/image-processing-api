# image-processing-api
An API that can be used in two different ways. As a simple placeholder API, the first allows to place images into the frontend with the size set via URL parameters (and optional additional stylization) for rapid prototyping. The second use case is as a library to serve properly scaled versions of images to the front end to reduce page load size.

Scripts used:
- test: npm run test ( it build the project before test it)
- start: npm run start
- build: npm run build

The endpoint that should be accessed is: http://localhost:3000/api/images?filename={image_path}&width={width_to_resize}&height={height_to_resize}

After enter the endpoint, the image is process in the back-end and the server redirect to a page to see the resized image.
But it is necessary to refresh the page to see the resized image.
