from profiles.models import Profile


class MatchingService:
    """
    Service class for calculating match percentages between users
    """
    
    SKILL_WEIGHT = 0.6
    COLLEGE_WEIGHT = 0.25
    YEAR_WEIGHT = 0.15
    
    @staticmethod
    def calculate_skill_match(user_skills, candidate_skills):
        """Calculate skill overlap percentage"""
        if not user_skills or not candidate_skills:
            return 0
        
        user_skills_set = set(skill.lower().strip() for skill in user_skills)
        candidate_skills_set = set(skill.lower().strip() for skill in candidate_skills)
        
        if not user_skills_set:
            return 0
        
        intersection = user_skills_set.intersection(candidate_skills_set)
        union = user_skills_set.union(candidate_skills_set)
        
        if not union:
            return 0
        
        return len(intersection) / len(union)
    
    @staticmethod
    def calculate_match_percentage(user_profile, candidate_profile):
        """
        Calculate overall match percentage between two profiles
        Returns a percentage from 0 to 100
        """
        # Skill match
        skill_match = MatchingService.calculate_skill_match(
            user_profile.skills,
            candidate_profile.skills
        )
        
        # College match
        college_match = 1.0 if user_profile.college.lower() == candidate_profile.college.lower() else 0.0
        
        # Year match
        year_match = 1.0 if user_profile.year == candidate_profile.year else 0.0
        
        # Weighted calculation
        total_match = (
            skill_match * MatchingService.SKILL_WEIGHT +
            college_match * MatchingService.COLLEGE_WEIGHT +
            year_match * MatchingService.YEAR_WEIGHT
        )
        
        # Convert to percentage
        percentage = round(total_match * 100)
        
        # Perfect match bonus
        if skill_match == 1.0 and college_match == 1.0 and year_match == 1.0:
            percentage = 100
        
        return percentage
    
    @staticmethod
    def find_matches(user_profile, limit=50):
        """
        Find and return matching profiles sorted by match percentage
        """
        # Get all profiles except the user's own
        all_profiles = Profile.objects.exclude(user=user_profile.user).select_related('user')
        
        matches = []
        for candidate in all_profiles:
            match_percentage = MatchingService.calculate_match_percentage(
                user_profile,
                candidate
            )
            
            if match_percentage > 0:
                matches.append({
                    'user_id': candidate.user.id,
                    'name': candidate.full_name,
                    'college': candidate.college,
                    'year': candidate.year,
                    'skills': candidate.skills,
                    'match_percentage': match_percentage,
                    'bio': candidate.bio,
                    'city': candidate.city,
                    'state': candidate.state,
                })
        
        # Sort by match percentage (highest first)
        matches.sort(key=lambda x: x['match_percentage'], reverse=True)
        
        return matches[:limit]
