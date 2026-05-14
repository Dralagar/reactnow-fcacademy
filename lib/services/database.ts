import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

// Generic database service class
export class DatabaseService<T> {
  private collectionName: string;
  private schema: z.ZodSchema<T>;

  constructor(collectionName: string, schema: z.ZodSchema<T>) {
    this.collectionName = collectionName;
    this.schema = schema;
  }

  // Create a new document
  async create(data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      
      const document = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as T;

      // Validate with schema
      const validatedData = this.schema.parse(document);
      
      const result = await collection.insertOne(validatedData as any);
      return { ...validatedData, _id: result.insertedId.toString() } as T;
    } catch (error) {
      console.error(`Error creating document in ${this.collectionName}:`, error);
      throw new Error(`Failed to create document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all documents
  async findAll(filter: Partial<T> = {}): Promise<T[]> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      const documents = await collection.find(filter as any).toArray();
      return documents.map(doc => ({ ...doc, _id: doc._id.toString() })) as T[];
    } catch (error) {
      console.error(`Error finding documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to find documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get document by ID
  async findById(id: string): Promise<T | null> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      const document = await collection.findOne({ _id: new ObjectId(id) } as any);
      return document ? ({ ...document, _id: document._id.toString() }) as T : null;
    } catch (error) {
      console.error(`Error finding document by ID in ${this.collectionName}:`, error);
      throw new Error(`Failed to find document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Find documents with filter
  async find(filter: Partial<T>): Promise<T[]> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      const documents = await collection.find(filter as any).toArray();
      return documents.map(doc => ({ ...doc, _id: doc._id.toString() })) as T[];
    } catch (error) {
      console.error(`Error finding documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to find documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Find one document with filter
  async findOne(filter: Partial<T>): Promise<T | null> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      const document = await collection.findOne(filter as any);
      return document ? ({ ...document, _id: document._id.toString() }) as T : null;
    } catch (error) {
      console.error(`Error finding document in ${this.collectionName}:`, error);
      throw new Error(`Failed to find document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update document by ID
  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      
      const updateData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      // Validate with schema (partial)
      const validatedData = this.schema.partial().parse(updateData);
      
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) } as any,
        { $set: validatedData as any },
        { returnDocument: 'after' }
      );

      return result ? ({ ...result, _id: result._id.toString() }) as T : null;
    } catch (error) {
      console.error(`Error updating document in ${this.collectionName}:`, error);
      throw new Error(`Failed to update document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Delete document by ID
  async delete(id: string): Promise<boolean> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      const result = await collection.deleteOne({ _id: new ObjectId(id) } as any);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document from ${this.collectionName}:`, error);
      throw new Error(`Failed to delete document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Count documents
  async count(filter: Partial<T> = {}): Promise<number> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      return await collection.countDocuments(filter as any);
    } catch (error) {
      console.error(`Error counting documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to count documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Pagination
  async findWithPagination(
    filter: Partial<T> = {},
    page: number = 1,
    limit: number = 10,
    sort: Record<string, 1 | -1> = { createdAt: -1 }
  ): Promise<{
    documents: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      
      const skip = (page - 1) * limit;
      
      const [documents, total] = await Promise.all([
        collection
          .find(filter as any)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray(),
        collection.countDocuments(filter as any)
      ]);

      return {
        documents: documents.map(doc => ({ ...doc, _id: doc._id.toString() })) as T[],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error(`Error finding documents with pagination in ${this.collectionName}:`, error);
      throw new Error(`Failed to find documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Search documents (text search)
  async search(searchTerm: string, fields: string[] = []): Promise<T[]> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      
      let searchQuery: any = {};
      
      if (fields.length > 0) {
        const orQueries = fields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' }
        }));
        searchQuery = { $or: orQueries };
      } else {
        searchQuery = { $text: { $search: searchTerm } };
      }

      const documents = await collection.find(searchQuery).toArray();
      return documents.map(doc => ({ ...doc, _id: doc._id.toString() })) as T[];
    } catch (error) {
      console.error(`Error searching documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to search documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Aggregate operations
  async aggregate(pipeline: any[]): Promise<any[]> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      return await collection.aggregate(pipeline).toArray();
    } catch (error) {
      console.error(`Error aggregating documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to aggregate documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Bulk operations
  async bulkInsert(documents: Omit<T, '_id' | 'createdAt' | 'updatedAt'>[]): Promise<T[]> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      
      const documentsWithTimestamps = documents.map(doc => ({
        ...doc,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })) as T[];

      // Validate all documents
      const validatedDocuments = documentsWithTimestamps.map(doc => this.schema.parse(doc));
      
      const result = await collection.insertMany(validatedDocuments as any);
      
      return validatedDocuments.map((doc, index) => ({
        ...doc,
        _id: result.insertedIds[index].toString()
      })) as T[];
    } catch (error) {
      console.error(`Error bulk inserting documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to bulk insert documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update multiple documents
  async bulkUpdate(filter: Partial<T>, updateData: Partial<T>): Promise<{ modifiedCount: number }> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      
      const updateDoc = {
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      const validatedUpdate = this.schema.partial().parse(updateDoc);
      
      const result = await collection.updateMany(filter as any, { $set: validatedUpdate as any });
      return { modifiedCount: result.modifiedCount };
    } catch (error) {
      console.error(`Error bulk updating documents in ${this.collectionName}:`, error);
      throw new Error(`Failed to bulk update documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Delete multiple documents
  async bulkDelete(filter: Partial<T>): Promise<{ deletedCount: number }> {
    try {
      const collection = await getCollection<T>(this.collectionName);
      const result = await collection.deleteMany(filter as any);
      return { deletedCount: result.deletedCount };
    } catch (error) {
      console.error(`Error bulk deleting documents from ${this.collectionName}:`, error);
      throw new Error(`Failed to bulk delete documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export function to create service instances
export function createDatabaseService<T>(collectionName: string, schema: z.ZodSchema<T>): DatabaseService<T> {
  return new DatabaseService<T>(collectionName, schema);
}

// Error handling utility
export class DatabaseError extends Error {
  constructor(message: string, public code?: string, public details?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Validation utility
export function validateDocument<T>(schema: z.ZodSchema<T>, data: any): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new DatabaseError(`Validation failed: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR', error.errors);
    }
    throw new DatabaseError(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'VALIDATION_ERROR');
  }
}

// Connection check utility
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const db = await import('@/lib/mongodb').then(m => m.getDatabase());
    await db.admin().ping();
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

// Factory function to create database service instances
export function createDatabaseService<T>(collectionName: string, schema: z.ZodSchema<T>): DatabaseService<T> {
  return new DatabaseService<T>(collectionName, schema);
}

// Collection statistics utility
export async function getCollectionStats(collectionName: string): Promise<{
  count: number;
  size: number;
  avgDocumentSize: number;
  indexes: number;
}> {
  try {
    const db = await import('@/lib/mongodb').then(m => m.getDatabase());
    const stats = await db.collection(collectionName).stats();
    
    return {
      count: stats.count || 0,
      size: stats.size || 0,
      avgDocumentSize: stats.avgObjSize || 0,
      indexes: stats.nindexes || 0
    };
  } catch (error) {
    console.error(`Error getting stats for collection ${collectionName}:`, error);
    throw new DatabaseError(`Failed to get collection stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
