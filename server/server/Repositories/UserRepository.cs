using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Interfaces;
using server.Dtos;
using AutoMapper;
using server.Helpers;

namespace server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMapper _mapper;

        public UserRepository(IOptions<MongoDBSettings> mongoDBSettings, IMapper mapper)
        {
            _mapper = mapper;

            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _usersCollection = database.GetCollection<User>(mongoDBSettings.Value.UserCollection);

            var firstNameIndexDefinition = Builders<User>.IndexKeys.Ascending(u => u.firstName);
            var firstNameIndexOptions = new CreateIndexOptions { Unique = true };
            var firstNameIndexModel = new CreateIndexModel<User>(firstNameIndexDefinition, firstNameIndexOptions);
            _usersCollection.Indexes.CreateOne(firstNameIndexModel);

            var lastNameIndexDefinition = Builders<User>.IndexKeys.Ascending(u => u.lastName);
            var lastNameIndexOptions = new CreateIndexOptions { Unique = true };
            var lastNameIndexModel = new CreateIndexModel<User>(lastNameIndexDefinition, lastNameIndexOptions);
            _usersCollection.Indexes.CreateOne(lastNameIndexModel);

            var countryCityIndexDefinition = Builders<User>.IndexKeys.Ascending(u => u.country).Ascending(u => u.city);
            var countryCityIndexOptions = new CreateIndexOptions { Unique = true };
            var countryCityIndexModel = new CreateIndexModel<User>(countryCityIndexDefinition, countryCityIndexOptions);
            _usersCollection.Indexes.CreateOne(countryCityIndexModel);
        }

        public async Task<List<User>> GetAllUsers(QueryObject query)
        {
            var users = _usersCollection.Find(new BsonDocument());

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("birthDate", StringComparison.OrdinalIgnoreCase))
                {
                    users = query.isDecending ? _usersCollection.Find(new BsonDocument()).SortByDescending(e => e.birthDate) : _usersCollection.Find(new BsonDocument()).SortBy(e => e.birthDate);
                }
            }

            return await users.ToListAsync();
        }

        public async Task<User> CreateUser(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);

            DateOnly today = DateOnly.FromDateTime(DateTime.Now);

            int age = AgeCalculator.CalculateAge(user.birthDate, today);

            if (age < 18) { 
                throw new InvalidOperationException("User must be at least 18 years old to register.");
            }

            await _usersCollection.InsertOneAsync(user);

            return user;
        }
    }
}
