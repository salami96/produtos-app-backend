const cloudinary = require('cloudinary');

export class ImageRepository {
    static async saveImage(file: any, public_id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(file.path, { public_id }, (err, resp) => {
                if (err) return reject(err);
                return resolve(resp.secure_url);
            })
        });
    }
    static async saveImages(files: any, name: string): Promise<string[]> {
        return Promise.all(
            files.map((file, i) => {
                return this.saveImage(file, `${name}-${i}`);
            })
        );
    }
}