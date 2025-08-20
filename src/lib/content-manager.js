import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');

// Ensure directories exist
if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR);
if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR);

export const contentManager = {
  // Posts
  async savePost(slug, postData) {
    const filePath = path.join(POSTS_DIR, `${slug}.json`);
    const data = {
      ...postData,
      updatedAt: new Date().toISOString(),
      createdAt: postData.createdAt || new Date().toISOString(),
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return data;
  },

  async getPost(slug) {
    const filePath = path.join(POSTS_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  },

  async getAllPosts() {
    if (!fs.existsSync(POSTS_DIR)) return [];
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));
    return files.map(file => {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async deletePost(slug) {
    const filePath = path.join(POSTS_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  },
};
