import { SocialActivity, SocialPost, AppDatabase } from '../types';
import { getDatabaseSync, saveDatabase } from './DatabaseService';

export function addSocialActivity(activity: Omit<SocialActivity, 'id' | 'createdAt'>): AppDatabase {
  const db = getDatabaseSync();
  const newActivity: SocialActivity = {
    ...activity,
    id: `act-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  db.socialActivities = [newActivity, ...(db.socialActivities || [])];
  saveDatabase(db);
  return db;
}

export function addSocialPost(post: Omit<SocialPost, 'id' | 'createdAt' | 'likesCount' | 'likesPersonIds' | 'comments'>): AppDatabase {
  const db = getDatabaseSync();
  const newPost: SocialPost = {
    ...post,
    id: `post-${Date.now()}`,
    createdAt: new Date().toISOString(),
    likesCount: 0,
    likesPersonIds: [],
    comments: []
  };
  db.socialPosts = [newPost, ...(db.socialPosts || [])];
  saveDatabase(db);
  return db;
}

export function likeSocialPost(postId: string, personId: string): AppDatabase {
  const db = getDatabaseSync();
  if (!db.socialPosts) return db;

  db.socialPosts = db.socialPosts.map(post => {
    if (post.id === postId) {
      const hasLiked = post.likesPersonIds?.includes(personId) ?? false;
      const likesPersonIds = hasLiked
        ? (post.likesPersonIds ?? []).filter(id => id !== personId)
        : [...(post.likesPersonIds ?? []), personId];
      return {
        ...post,
        likesCount: likesPersonIds.length,
        likesPersonIds
      };
    }
    return post;
  });
  saveDatabase(db);
  return db;
}

export function addCommentToPost(postId: string, personId: string, content: string): AppDatabase {
  const db = getDatabaseSync();
  if (!db.socialPosts) return db;

  db.socialPosts = db.socialPosts.map(post => {
    if (post.id === postId) {
      const comments = post.comments ?? [];
      return {
        ...post,
        comments: [...comments, {
          id: `comm-${Date.now()}`,
          personId,
          content,
          createdAt: new Date().toISOString()
        }]
      };
    }
    return post;
  });
  saveDatabase(db);
  return db;
}

export function deleteSocialPost(postId: string): AppDatabase {
  const db = getDatabaseSync();
  if (!db.socialPosts) return db;
  db.socialPosts = db.socialPosts.filter(post => post.id !== postId);
  saveDatabase(db);
  return db;
}
