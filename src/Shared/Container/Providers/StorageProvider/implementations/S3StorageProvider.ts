import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { resolve } from 'path';

import { IStorageProvider } from "../IStorageProvider";
import upload from '@config/upload';



class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.lookup(originalName);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET as string,
      Key: `${folder}/${file}`, 
      Body: fileContent,
      ContentType: ContentType || undefined,
    })

    await this.client.send(command);

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET as string,
      Key: `${folder}/${file}`,
    })

    await this.client.send(command);

  }

}

export { S3StorageProvider }