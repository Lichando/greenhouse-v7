import { PropertyRepository } from '../repository';
import { CreatePropertyInput, UpdatePropertyInput, PropertyFilter } from '../validation';
import { AppError } from '../../../core/errors';
import { logger } from '../../../core/logger';

export class PropertyService {
  constructor(private repository: PropertyRepository) {}

  async createProperty(input: CreatePropertyInput) {
    try {
      const property = await this.repository.create(input);
      logger.info(`Property created: ${property.id}`);
      return property;
    } catch (error) {
      logger.error('Property creation failed', error);
      throw new AppError('Failed to create property', 500);
    }
  }

  async getPropertyBySlug(slug: string) {
    const property = await this.repository.findBySlug(slug);
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    return property;
  }

  async getPropertyById(id: string) {
    const property = await this.repository.findById(id);
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    return property;
  }

  async searchProperties(filters: PropertyFilter) {
    return this.repository.findMany(filters);
  }

  async getFeaturedProperties(limit: number = 6) {
    return this.repository.getFeaturedProperties(limit);
  }

  async updateProperty(id: string, input: UpdatePropertyInput) {
    try {
      const property = await this.repository.findById(id);
      if (!property) {
        throw new AppError('Property not found', 404);
      }

      // Update logic would go here
      // This is a simplified example
      logger.info(`Property updated: ${id}`);
      return property;
    } catch (error) {
      logger.error('Property update failed', error);
      throw new AppError('Failed to update property', 500);
    }
  }

  async deleteProperty(id: string) {
    try {
      const property = await this.repository.findById(id);
      if (!property) {
        throw new AppError('Property not found', 404);
      }

      logger.info(`Property deleted: ${id}`);
      return { success: true };
    } catch (error) {
      logger.error('Property deletion failed', error);
      throw new AppError('Failed to delete property', 500);
    }
  }
}
