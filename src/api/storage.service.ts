import * as aws from 'aws-sdk';

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('https://nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "DO003KFMRQU2WFGMUHDY",
  secretAccessKey: "dm1RTVQeFi3oFGZDORhrXA5aRA9mrjs7A4Hp5eyjeCI",
  s3ForcePathStyle: true,
});

export const uploadFile = (file: string, fileName: string) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: 'ol-sb-1000',
    Key: `uploads/${fileName}`,
    Body: file,
    ACL: 'public-read'
  };

  // Uploading files to the space
  return s3.upload(params).promise();
};
