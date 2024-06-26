﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Helpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("users")]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [Required]
        public string firstName { get; set; } = string.Empty;
        [Required]
        public string lastName { get; set; } = string.Empty ;
        [Required]
        public DateOnly birthDate { get; set; }
        [Required]
        public string country { get; set; } = string.Empty ;
        [Required]
        public string city { get; set; } = string.Empty ;
        public int proximityToCurrentDate { get; set; }
    }
}
