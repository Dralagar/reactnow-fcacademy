# Database Integration Guide

This document provides comprehensive information about the MongoDB database integration for React Now FC Academy.

## Overview

The application uses MongoDB as the primary database with the following key features:
- **Type-safe schemas** using Zod validation
- **RESTful API endpoints** for all CRUD operations
- **Service layer** for database operations
- **Real-time statistics** and analytics
- **Age group management** for youth football
- **Blog content management system**
- **Training session tracking**
- **Match management system**

## Database Schema

### Core Entities

#### 1. Players (`players` collection)
- Personal information (name, age, contact details)
- Football-specific data (position, skill level, jersey number)
- Medical information and emergency contacts
- Performance statistics and achievements
- Status tracking (active, injured, suspended, etc.)

#### 2. Coaches (`coaches` collection)
- Professional qualifications and certifications
- Specialization areas and experience
- Availability and employment status
- Background check management
- Skills and languages

#### 3. Teams (`teams` collection)
- Team categorization by age groups (U6, U8, U10, etc.)
- Roster management and player assignments
- Training schedules and venues
- Performance statistics and achievements
- Team branding and colors

#### 4. Matches (`matches` collection)
- Match scheduling and venue management
- Lineup and substitution tracking
- Real-time score updates
- Detailed statistics and events
- Player performance metrics

#### 5. Training Sessions (`training` collection)
- Session planning and scheduling
- Attendance tracking
- Player assessments and progress monitoring
- Equipment and resource management
- Health and safety incident tracking

#### 6. Blog Posts (`blog` collection)
- Content management with categories and tags
- SEO optimization and metadata
- Comment system and engagement tracking
- Social media integration
- Publication scheduling

## API Endpoints

### Players
- `GET /api/players` - List all players with filtering and pagination
- `POST /api/players` - Create a new player
- `GET /api/players/[id]` - Get specific player details
- `PUT /api/players/[id]` - Update player information
- `DELETE /api/players/[id]` - Remove a player

### Blog
- `GET /api/blog` - List blog posts with search and filtering
- `POST /api/blog` - Create new blog post
- `GET /api/blog/[id]` - Get specific blog post
- `PUT /api/blog/[id]` - Update blog post
- `DELETE /api/blog/[id]` - Remove blog post

### Query Parameters
- `page` - Pagination page number
- `limit` - Number of items per page
- `search` - Text search functionality
- `category` - Filter by category
- `status` - Filter by status
- `ageGroup` - Filter by age group
- `position` - Filter by position

## Setup Instructions

### 1. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env.local
```

Update the MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/reactnowfc
```

### 2. Install Dependencies

```bash
npm install mongodb zod
```

### 3. Database Setup

#### Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### MongoDB Atlas
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get the connection string
3. Update `MONGODB_URI` in your `.env.local`

### 4. Database Initialization

The application will automatically create collections and indexes on first run. For manual setup:

```javascript
// Connect to MongoDB
use reactnowfc

// Create indexes for better performance
db.players.createIndex({ "firstName": 1, "lastName": 1 })
db.players.createIndex({ "age": 1 })
db.players.createIndex({ "position": 1 })
db.teams.createIndex({ "ageGroup": 1 })
db.blog.createIndex({ "slug": 1 })
db.blog.createIndex({ "status": 1 })
```

## Service Layer Usage

### Player Service Example

```typescript
import { playerService } from '@/lib/services/player.service';

// Create a new player
const player = await playerService.createPlayer({
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '2010-05-15',
  position: 'Midfielder',
  skillLevel: 'Intermediate',
  contactInfo: {
    phone: '+254712345678',
    email: 'parent@example.com'
  }
});

// Get players by age group
const u12Players = await playerService.getPlayersByAgeGroup('U12');

// Update player statistics
await playerService.updatePlayerStatistics(playerId, {
  goalsScored: 5,
  matchesPlayed: 10
});
```

### Database Service Example

```typescript
import { createDatabaseService } from '@/lib/services/database';
import { PlayerSchema } from '@/lib/schemas/player';

const playerDb = createDatabaseService('players', PlayerSchema);

// Advanced queries
const players = await playerDb.findWithPagination(
  { status: 'Active' },
  1, // page
  10, // limit
  { createdAt: -1 } // sort
);

// Search functionality
const searchResults = await playerDb.search('john', ['firstName', 'lastName']);
```

## Age Group Management

The system implements automatic age group calculation:

```typescript
import { getAgeGroup, isEligibleForAgeGroup } from '@/lib/schemas/player';

const playerAge = 12;
const ageGroup = getAgeGroup(playerAge); // Returns 'U12'
const isEligible = isEligibleForAgeGroup(playerAge, 'U12'); // Returns true
```

### Age Group Definitions
- **U6**: 4-5 years
- **U8**: 6-7 years
- **U10**: 8-9 years
- **U12**: 10-11 years
- **U14**: 12-13 years
- **U16**: 14-15 years
- **U18**: 16-17 years
- **U20**: 18-19 years
- **U23**: 20-22 years
- **Senior**: 23-25 years

## Blog System Features

### Content Management
- Rich text editing with markdown support
- Image and media management
- SEO optimization with meta tags
- Publication scheduling
- Category and tag system

### Engagement Tracking
- View counts and analytics
- Comment system with moderation
- Social sharing integration
- Like and bookmark functionality

### Search and Discovery
- Full-text search across content
- Category-based filtering
- Related posts recommendations
- Popular posts tracking

## Admin Dashboard

The admin dashboard provides comprehensive management tools:

### Features
- **Overview**: Real-time statistics and quick actions
- **Players**: Complete player management with filtering
- **Teams**: Team creation and roster management
- **Matches**: Match scheduling and result tracking
- **Training**: Session planning and attendance
- **Blog**: Content creation and management
- **Settings**: Academy configuration and preferences

### Access Control
The admin dashboard should be protected with authentication:
```typescript
// Example middleware for admin protection
export async function requireAdmin(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.role === 'admin') {
    return NextResponse.redirect('/login');
  }
  
  return null;
}
```

## Performance Optimization

### Database Indexing
```javascript
// Critical indexes for performance
db.players.createIndex({ "status": 1, "age": 1 })
db.players.createIndex({ "position": 1, "skillLevel": 1 })
db.blog.createIndex({ "status": 1, "publishedAt": -1 })
db.matches.createIndex({ "date": 1, "status": 1 })
db.training.createIndex({ "date": 1, "status": 1 })
```

### Caching Strategy
- Implement Redis caching for frequently accessed data
- Use Next.js ISR (Incremental Static Regeneration) for blog posts
- Cache team statistics and player counts

### Pagination
All list endpoints support pagination to handle large datasets:
```typescript
// Example pagination usage
const { data, pagination } = await playerDb.findWithPagination(
  {},
  1, // page
  20 // limit
);
```

## Security Considerations

### Input Validation
All inputs are validated using Zod schemas:
```typescript
const playerData = PlayerSchema.parse(requestBody);
```

### Data Sanitization
- Sanitize all user inputs before database operations
- Implement rate limiting for API endpoints
- Use parameterized queries to prevent injection

### Access Control
- Implement role-based access control
- Secure sensitive endpoints with authentication
- Audit logs for administrative actions

## Backup and Recovery

### Automated Backups
```bash
# Daily backup script
mongodump --uri="MONGODB_URI" --out=/backups/$(date +%Y%m%d)

# Restore from backup
mongorestore --uri="MONGODB_URI" /backups/20240115
```

### Data Export
```javascript
// Export player data
const players = await playerService.getAllPlayers();
const csv = convertToCSV(players);
```

## Monitoring and Analytics

### Database Metrics
- Connection pool monitoring
- Query performance tracking
- Index usage statistics
- Error rate monitoring

### Application Metrics
- API response times
- User engagement tracking
- Content performance analytics
- System health monitoring

## Troubleshooting

### Common Issues

#### Connection Errors
```bash
# Check MongoDB connection
mongosh "MONGODB_URI"

# Verify network connectivity
telnet localhost 27017
```

#### Performance Issues
```javascript
// Enable slow query logging
db.setProfilingLevel(2, { slowms: 100 });

// Check query execution stats
db.players.find({ status: 'Active' }).explain('executionStats');
```

#### Memory Issues
- Monitor memory usage with `mongostat`
- Implement proper connection pooling
- Use pagination for large datasets

## Development Workflow

### 1. Local Development
```bash
# Start development server
npm run dev

# Start MongoDB
docker-compose up -d mongodb
```

### 2. Testing
```bash
# Run database tests
npm run test:db

# Run integration tests
npm run test:integration
```

### 3. Deployment
```bash
# Build for production
npm run build

# Deploy with environment variables
MONGODB_URI="production-uri" npm start
```

## Future Enhancements

### Planned Features
- Real-time notifications using WebSockets
- Advanced analytics dashboard
- Mobile app integration
- Video analysis for training sessions
- Automated report generation
- Integration with external football APIs

### Scalability Considerations
- Database sharding for large datasets
- Read replicas for improved performance
- CDN integration for media files
- Microservices architecture for specific features

## Support

For database-related issues:
1. Check the MongoDB logs
2. Verify connection strings
3. Review schema validation errors
4. Monitor performance metrics
5. Check API endpoint responses

For additional support, refer to the [MongoDB Documentation](https://docs.mongodb.com/) and [Next.js Documentation](https://nextjs.org/docs).
