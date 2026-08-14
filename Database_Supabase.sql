-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2026-08-14T12:53:14.930Z

CREATE TYPE "organization_type" AS ENUM (
  'governing_body',
  'league',
  'team'
);

CREATE TYPE "management_position" AS ENUM (
  'president',
  'general_manager',
  'coach',
  'scout',
  'medical_staff'
);

CREATE TYPE "league_level" AS ENUM (
  'professional',
  'semi_pro',
  'amateur',
  'youth'
);

CREATE TYPE "player_position" AS ENUM (
  'center',
  'left_wing',
  'right_wing',
  'defenseman',
  'goaltender'
);

CREATE TYPE "player_handedness" AS ENUM (
  'left',
  'right',
  'ambidextrous'
);

CREATE TYPE "contract_type" AS ENUM (
  'two_way',
  'one_way',
  'entry_level',
  'extension',
  'pto'
);

CREATE TYPE "tournament_type" AS ENUM (
  'invitational',
  'championship',
  'exhibition',
  'qualifier'
);

CREATE TYPE "event_type" AS ENUM (
  'game',
  'practice',
  'meeting',
  'community',
  'press_conference'
);

CREATE TYPE "rsvp_status" AS ENUM (
  'pending',
  'attending',
  'declined',
  'maybe'
);

CREATE TYPE "task_status" AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE "marketing_campaign_status" AS ENUM (
  'draft',
  'active',
  'paused',
  'completed'
);

CREATE TYPE "marketing_campaign_type" AS ENUM (
  'social',
  'email',
  'print',
  'tv'
);

CREATE TYPE "storefront_status" AS ENUM (
  'active',
  'inactive',
  'maintenance'
);

CREATE TYPE "storefront_theme" AS ENUM (
  'default',
  'dark',
  'light'
);

CREATE TYPE "loan_status" AS ENUM (
  'active',
  'terminated',
  'completed'
);

CREATE TYPE "all_star_game_status" AS ENUM (
  'scheduled',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE "document_type" AS ENUM (
  'contract',
  'medical',
  'id',
  'tax',
  'other'
);

CREATE TYPE "access_level" AS ENUM (
  'private',
  'public',
  'restricted'
);

CREATE TYPE "entity_type" AS ENUM (
  'user',
  'team',
  'league',
  'player'
);

CREATE TYPE "user_friend_status" AS ENUM (
  'pending',
  'accepted',
  'blocked'
);

CREATE TYPE "channel_status" AS ENUM (
  'active',
  'archived',
  'deleted'
);

CREATE TYPE "channel_type" AS ENUM (
  'public',
  'private',
  'announcement'
);

CREATE TYPE "registration_form_status" AS ENUM (
  'draft',
  'active',
  'archived'
);

CREATE TYPE "registration_submission_status" AS ENUM (
  'pending',
  'approved',
  'rejected'
);

CREATE TYPE "bonus_status" AS ENUM (
  'pending',
  'earned',
  'paid'
);

CREATE TYPE "fine_status" AS ENUM (
  'pending',
  'paid',
  'appealed'
);

CREATE TYPE "bracket_status" AS ENUM (
  'draft',
  'active',
  'completed'
);

CREATE TYPE "series_status" AS ENUM (
  'scheduled',
  'in_progress',
  'completed'
);

CREATE TYPE "carpool_status" AS ENUM (
  'open',
  'full',
  'cancelled'
);

CREATE TYPE "carpool_participant_status" AS ENUM (
  'pending',
  'accepted',
  'declined'
);

CREATE TYPE "camp_status" AS ENUM (
  'scheduled',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE "camp_registration_status" AS ENUM (
  'pending',
  'registered',
  'waitlisted',
  'cancelled'
);

CREATE TYPE "deliverable_status" AS ENUM (
  'pending',
  'in_progress',
  'completed'
);

CREATE TYPE "model_status" AS ENUM (
  'draft',
  'training',
  'active',
  'deprecated'
);

CREATE TYPE "waitlist_status" AS ENUM (
  'waiting',
  'notified',
  'purchased'
);

CREATE TYPE "membership_status" AS ENUM (
  'active',
  'expired',
  'cancelled'
);

CREATE TYPE "campaign_status" AS ENUM (
  'active',
  'completed',
  'cancelled'
);

CREATE TYPE "fan_club_status" AS ENUM (
  'active',
  'inactive'
);

CREATE TYPE "stream_status" AS ENUM (
  'scheduled',
  'live',
  'completed',
  'cancelled'
);

CREATE TYPE "milestone_status" AS ENUM (
  'pending',
  'achieved',
  'missed'
);

CREATE TYPE "waiver_status" AS ENUM (
  'active',
  'cleared',
  'claimed'
);

CREATE TYPE "claim_status" AS ENUM (
  'pending',
  'successful',
  'unsuccessful'
);

CREATE TYPE "bracket_type" AS ENUM (
  'single_elimination',
  'double_elimination'
);

CREATE TYPE "match_type" AS ENUM (
  'regular_season',
  'pre_season',
  'playoffs',
  'friendly_match',
  'tournament'
);

CREATE TYPE "game_status" AS ENUM (
  'scheduled',
  'in_progress',
  'completed',
  'postponed',
  'cancelled'
);

CREATE TYPE "penalty_type" AS ENUM (
  'minor',
  'major',
  'misconduct',
  'game_misconduct',
  'match_misconduct',
  'bench_minor',
  'bench_major',
  'delay_of_game',
  'hooking',
  'slashing',
  'high_sticking',
  'cross_checking',
  'elbowing',
  'checking_from_behind',
  'boarding',
  'unsportsmanlike_conduct',
  'interference',
  'roughing',
  'tripping'
);

CREATE TYPE "event_type_enum" AS ENUM (
  'goal',
  'assist',
  'shot_on_goal',
  'faceoff',
  'icing',
  'offsides',
  'goalie_change',
  'penalty',
  'end_of_period',
  'start_of_period',
  'period_end',
  'overtime_start',
  'overtime_end',
  'shootout_start',
  'shootout_end',
  'shootout_attempt'
);

CREATE TYPE "injury_status" AS ENUM (
  'active',
  'healing',
  'cleared',
  'chronic'
);

CREATE TYPE "suspension_status" AS ENUM (
  'active',
  'served',
  'appealed',
  'lifted'
);

CREATE TYPE "free_agency_status" AS ENUM (
  'available',
  'reserved',
  'signed',
  'unsigned'
);

CREATE TYPE "coach_type" AS ENUM (
  'head_coach',
  'assistant_coach',
  'goaltending_coach',
  'strength_and_conditioning_coach',
  'skills_coach',
  'development_coach'
);

CREATE TYPE "trainer_type" AS ENUM (
  'athletic_trainer',
  'strength_coach',
  'sports_medicine',
  'physical_therapist'
);

CREATE TYPE "scout_level" AS ENUM (
  'amateur',
  'professional',
  'college',
  'international',
  'head_scout'
);

CREATE TYPE "official_type" AS ENUM (
  'referee',
  'linesman',
  'goal_judge',
  'timekeeper',
  'penalty_box',
  'head_official'
);

CREATE TYPE "official_assignment_status" AS ENUM (
  'scheduled',
  'confirmed',
  'completed',
  'cancelled',
  'no_show'
);

CREATE TYPE "certification_status" AS ENUM (
  'current',
  'expired',
  'pending_renewal',
  'suspended',
  'revoked'
);

CREATE TYPE "marketplace_status" AS ENUM (
  'active',
  'sold',
  'delisted',
  'expired',
  'pending'
);

CREATE TYPE "transaction_status" AS ENUM (
  'pending',
  'completed',
  'cancelled',
  'disputed',
  'refunded'
);

CREATE TYPE "order_status" AS ENUM (
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'returned'
);

CREATE TYPE "sponsorship_tier" AS ENUM (
  'platinum',
  'gold',
  'silver',
  'bronze',
  'community'
);

CREATE TYPE "practice_attendance_status" AS ENUM (
  'present',
  'absent',
  'excused',
  'late',
  'left_early'
);

CREATE TYPE "event_status" AS ENUM (
  'scheduled',
  'cancelled',
  'postponed',
  'completed',
  'in_progress'
);

CREATE TYPE "fan_club_tier" AS ENUM (
  'standard',
  'member',
  'vip',
  'founder'
);

CREATE TYPE "news_category" AS ENUM (
  'team_news',
  'player_news',
  'league_news',
  'injury_update',
  'trade_rumor',
  'analysis',
  'feature',
  'opinion'
);

CREATE TYPE "poll_type" AS ENUM (
  'single_choice',
  'multiple_choice',
  'rating',
  'ranking'
);

CREATE TYPE "poll_status" AS ENUM (
  'draft',
  'active',
  'closed',
  'archived'
);

CREATE TYPE "entity_relationship" AS ENUM (
  'player',
  'coach',
  'parent',
  'agent',
  'guardian',
  'family',
  'other'
);

CREATE TYPE "permission_level" AS ENUM (
  'view',
  'edit',
  'admin',
  'owner'
);

CREATE TYPE "accessibility_feature" AS ENUM (
  'wheelchair_accessible',
  'accessible_parking',
  'accessible_restrooms',
  'elevators',
  'transit_accessible',
  'accessible_seating'
);

CREATE TYPE "disciplinary_action" AS ENUM (
  'warning',
  'fine',
  'suspension',
  'game_misconduct',
  'match_misconduct'
);

CREATE TYPE "development_level" AS ENUM (
  'u16',
  'u18',
  'u20',
  'junior',
  'professional'
);

CREATE TYPE "challenge_type" AS ENUM (
  'goal',
  'no_goal',
  'offsides',
  'high_stick',
  'goalie_interference',
  'hand_pass',
  'delay_of_game'
);

CREATE TYPE "content_moderation_status" AS ENUM (
  'pending',
  'reviewed',
  'approved',
  'rejected',
  'removed',
  'restored'
);

CREATE TYPE "moderation_action" AS ENUM (
  'none',
  'warning',
  'restricted',
  'suspended',
  'banned',
  'content_removed'
);

CREATE TYPE "streaming_platform" AS ENUM (
  'youtube',
  'twitch',
  'facebook',
  'own_site',
  'hls_stream',
  'other'
);

CREATE TYPE "medical_record_type" AS ENUM (
  'physical_exam',
  'injury_report',
  'surgery_record',
  'allergy_report',
  'medication_record',
  'vaccination_record',
  'other'
);

CREATE TYPE "doping_test_type" AS ENUM (
  'random',
  'scheduled',
  'competition',
  'out_of_competition',
  'investigation'
);

CREATE TYPE "doping_result" AS ENUM (
  'pending',
  'negative',
  'positive',
  'inconclusive',
  'cancelled',
  'withdrawn'
);

CREATE TYPE "check_result" AS ENUM (
  'pending',
  'clear',
  'failed',
  'conditional_approval',
  'expired'
);

CREATE TYPE "dispute_status" AS ENUM (
  'open',
  'pending_resolution',
  'resolved',
  'escalated',
  'closed'
);

CREATE TYPE "dispute_type" AS ENUM (
  'payment_issue',
  'deliverable_non_compliance',
  'performance_gap',
  'termination_clause',
  'other'
);

CREATE TYPE "development_program_type" AS ENUM (
  'elite',
  'competitive',
  'recreational',
  'academy',
  'summer_camp',
  'winter_camp'
);

CREATE TYPE "camp_attendance" AS ENUM (
  'attended',
  'absent',
  'withdrew',
  'completed'
);

CREATE TYPE "player_ranking_category" AS ENUM (
  'overall',
  'points',
  'goals',
  'assists',
  'defense',
  'goaltending',
  'rookie',
  'by_position'
);

CREATE TYPE "reputation_score_type" AS ENUM (
  'leadership',
  'sportsmanship',
  'professionalism',
  'teamwork',
  'consistency'
);

CREATE TYPE "notification_channel" AS ENUM (
  'email',
  'sms',
  'push',
  'in_app',
  'webhook'
);

CREATE TYPE "notification_frequency" AS ENUM (
  'immediately',
  'daily_digest',
  'weekly_digest',
  'never'
);

CREATE TYPE "season_status" AS ENUM (
  'scheduled',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE "contract_status" AS ENUM (
  'active',
  'expired',
  'suspended',
  'terminated'
);

CREATE TYPE "vip_tier" AS ENUM (
  'standard',
  'gold',
  'platinum',
  'diamond'
);

CREATE TYPE "shipment_status" AS ENUM (
  'pending',
  'picked',
  'packed',
  'shipped',
  'in_transit',
  'delivered',
  'returned',
  'cancelled'
);

CREATE TYPE "delivery_method" AS ENUM (
  'standard',
  'express',
  'overnight',
  'pickup'
);

CREATE TYPE "approval_status" AS ENUM (
  'pending',
  'approved',
  'rejected',
  'on_hold'
);

CREATE TYPE "roster_status" AS ENUM (
  'active',
  'inactive',
  'reserve',
  'injured',
  'suspended'
);

CREATE TABLE "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar(100) UNIQUE NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" varchar NOT NULL,
  "role_id" integer,
  "public_id" varchar UNIQUE,
  "vip_tier" vip_tier DEFAULT 'standard',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "persons" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "date_of_birth" date,
  "nationality_id" integer,
  "bio" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "roles" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "description" text
);

CREATE TABLE "nationalities" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "code" varchar(2) UNIQUE
);

CREATE TABLE "ruling_bodies" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "country" varchar,
  "description" text,
  "website" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "organizations" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "type" organization_type,
  "country" varchar,
  "founded_year" integer,
  "headquarters_city" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "leagues" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "organization_id" integer,
  "name" varchar UNIQUE NOT NULL,
  "level" league_level,
  "country" varchar,
  "founded_year" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "seasons" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "year" integer NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "status" season_status DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "divisions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "region" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "teams" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "organization_id" integer,
  "division_id" integer,
  "public_id" varchar UNIQUE,
  "name" varchar NOT NULL,
  "abbreviation" varchar(3),
  "city" varchar(100) NOT NULL,
  "founded_year" integer,
  "home_arena" varchar,
  "logo_url" varchar(255),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "venues" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "city" varchar(100) NOT NULL,
  "country" varchar,
  "capacity" integer,
  "address" text,
  "website" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "management" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "team_id" integer,
  "organization_id" integer,
  "position" management_position NOT NULL,
  "start_date" date,
  "end_date" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "players" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "team_id" integer,
  "public_id" varchar UNIQUE,
  "position" player_position NOT NULL,
  "jersey_number" integer,
  "height_cm" integer,
  "weight_kg" integer,
  "handedness" player_handedness,
  "drafted_year" integer,
  "logo_url" varchar(255),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "rosters" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "jersey_number" integer,
  "status" roster_status DEFAULT 'active'
);

CREATE TABLE "lineups" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "lineup_position" varchar,
  "starting_lineup" boolean DEFAULT false
);

CREATE TABLE "injuries" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "injury_type" varchar NOT NULL,
  "description" text,
  "start_date" date NOT NULL,
  "estimated_return_date" date,
  "status" injury_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "suspensions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "reason" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "games_suspended" integer,
  "status" suspension_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "free_agency" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "available_date" date,
  "status" free_agency_status DEFAULT 'available',
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_equipment" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "equipment_type" varchar NOT NULL,
  "brand" varchar,
  "model" varchar,
  "description" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "contracts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "salary_annual" decimal(12,2),
  "contract_type" contract_type,
  "status" contract_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "trades" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "trade_date" date NOT NULL,
  "player_id" integer NOT NULL,
  "from_team_id" integer NOT NULL,
  "to_team_id" integer NOT NULL,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "draft" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "round" integer NOT NULL,
  "overall_pick" integer NOT NULL,
  "team_id" integer NOT NULL,
  "player_id" integer,
  "college" varchar,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "games" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "home_team_id" integer NOT NULL,
  "away_team_id" integer NOT NULL,
  "venue_id" integer,
  "match_type" match_type NOT NULL,
  "game_date" timestamp NOT NULL,
  "status" game_status DEFAULT 'scheduled',
  "home_goals" integer DEFAULT 0,
  "away_goals" integer DEFAULT 0,
  "attendance" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "game_setup" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "home_roster_confirmed" boolean DEFAULT false,
  "away_roster_confirmed" boolean DEFAULT false,
  "officials_assigned" boolean DEFAULT false,
  "venue_ready" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "game_settings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "period_duration_minutes" integer DEFAULT 20,
  "intermission_duration_minutes" integer DEFAULT 15,
  "overtime_enabled" boolean DEFAULT true,
  "shootout_enabled" boolean DEFAULT true,
  "video_review_enabled" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "game_events" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "event_type" event_type_enum NOT NULL,
  "player_id" integer,
  "team_id" integer,
  "assist_player_1_id" integer,
  "assist_player_2_id" integer,
  "period" integer,
  "time_in_period" varchar,
  "x_coordinate" decimal(5,2),
  "y_coordinate" decimal(5,2),
  "description" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "game_summaries" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "home_team_shots" integer,
  "away_team_shots" integer,
  "home_team_penalties_minutes" integer,
  "away_team_penalties_minutes" integer,
  "game_mvp_player_id" integer,
  "game_notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "live_game_scoring" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "period" integer NOT NULL,
  "home_goals" integer DEFAULT 0,
  "away_goals" integer DEFAULT 0,
  "timestamp" timestamp DEFAULT (now())
);

CREATE TABLE "player_stats" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "games_played" integer DEFAULT 0,
  "goals" integer DEFAULT 0,
  "assists" integer DEFAULT 0,
  "points" integer DEFAULT 0,
  "penalty_minutes" integer DEFAULT 0,
  "plus_minus" integer DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "standings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "division_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "wins" integer DEFAULT 0,
  "losses" integer DEFAULT 0,
  "overtime_losses" integer DEFAULT 0,
  "games_played" integer DEFAULT 0,
  "points" integer DEFAULT 0,
  "goals_for" integer DEFAULT 0,
  "goals_against" integer DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "practices" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "practice_date" date NOT NULL,
  "start_time" time,
  "end_time" time,
  "location" varchar,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "practice_attendance" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "practice_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "attendance_status" practice_attendance_status DEFAULT 'present'
);

CREATE TABLE "officials" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "official_type" official_type NOT NULL,
  "license_number" varchar UNIQUE,
  "certification_level" varchar,
  "certification_expiry" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "game_officials" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "official_id" integer NOT NULL,
  "role" varchar NOT NULL
);

CREATE TABLE "tournaments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "location" varchar,
  "tournament_type" tournament_type,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "tournament_participants" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "tournament_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "seed" integer
);

CREATE TABLE "achievements" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "achievement_name" varchar NOT NULL,
  "description" text,
  "achievement_date" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "awards" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "award_name" varchar NOT NULL,
  "player_id" integer,
  "team_id" integer,
  "award_category" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "social_media" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "platform" varchar NOT NULL,
  "handle" varchar NOT NULL,
  "profile_url" varchar(255),
  "followers" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "media" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer,
  "player_id" integer,
  "team_id" integer,
  "media_type" varchar NOT NULL,
  "title" varchar NOT NULL,
  "description" text,
  "url" varchar(255),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "documents" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "document_type" document_type NOT NULL,
  "file_url" varchar(255) NOT NULL,
  "file_size_bytes" integer,
  "mime_type" varchar,
  "entity_type" entity_type,
  "entity_id" integer,
  "uploaded_by_user_id" integer NOT NULL,
  "access_level" access_level DEFAULT 'private',
  "expiry_date" date,
  "is_archived" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "document_access_logs" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "document_id" integer NOT NULL,
  "accessed_by_user_id" integer NOT NULL,
  "access_type" varchar DEFAULT 'view',
  "accessed_at" timestamp DEFAULT (now())
);

CREATE TABLE "events" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text,
  "event_date" timestamp NOT NULL,
  "location" varchar,
  "event_type" event_type,
  "capacity" integer,
  "status" event_status DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "event_rsvp" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "event_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "rsvp_status" rsvp_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "brands" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "manufacturer_id" integer,
  "country" varchar,
  "website" varchar,
  "logo_url" varchar(255),
  "description" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "manufacturers" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "country" varchar NOT NULL,
  "headquarters_city" varchar,
  "website" varchar,
  "contact_email" varchar(255),
  "contact_phone" varchar,
  "logo_url" varchar(255),
  "description" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "retailers" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "contact_person" varchar,
  "email" varchar(255),
  "phone" varchar,
  "website" varchar,
  "address" text,
  "city" varchar,
  "country" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "sponsors" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "contact_person" varchar,
  "email" varchar(255),
  "phone" varchar,
  "website" varchar,
  "logo_url" varchar(255),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_sponsors" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "sponsor_id" integer NOT NULL,
  "sponsorship_level" sponsorship_tier,
  "start_date" date,
  "end_date" date,
  "amount_usd" decimal(12,2)
);

CREATE TABLE "settings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "setting_key" varchar UNIQUE NOT NULL,
  "setting_value" text,
  "description" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "admin_settings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer,
  "organization_id" integer,
  "setting_key" varchar NOT NULL,
  "setting_value" text NOT NULL,
  "setting_type" varchar DEFAULT 'string',
  "category" varchar,
  "description" text,
  "is_feature_flag" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "system_setup_wizard" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "step_number" integer DEFAULT 1,
  "step_name" varchar NOT NULL,
  "completed" boolean DEFAULT false,
  "data_submitted" text,
  "completed_at" timestamp,
  "completed_by_user_id" integer,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "system_definitions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "definition_key" varchar UNIQUE NOT NULL,
  "definition_value" text NOT NULL,
  "description" text,
  "category" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "scorekeeper_setup" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "home_scorekeeper_user_id" integer,
  "away_scorekeeper_user_id" integer,
  "home_timekeeper_user_id" integer,
  "away_timekeeper_user_id" integer,
  "scoreboard_integration" varchar,
  "clock_configuration" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "scorekeeper_settings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "enable_auto_save" boolean DEFAULT true,
  "enable_notifications" boolean DEFAULT true,
  "theme" varchar DEFAULT 'light',
  "shortcuts" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "league_manager_options" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "can_manage_schedule" boolean DEFAULT false,
  "can_manage_rosters" boolean DEFAULT false,
  "can_create_events" boolean DEFAULT false,
  "can_manage_divisions" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_manager_options" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "can_manage_roster" boolean DEFAULT false,
  "can_schedule_practices" boolean DEFAULT false,
  "can_edit_lineups" boolean DEFAULT false,
  "can_manage_contracts" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "personalisation" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "preferred_language" varchar DEFAULT 'en',
  "theme" varchar DEFAULT 'light',
  "notification_preferences" text,
  "favorite_teams" text,
  "favorite_players" text,
  "dashboard_layout" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "user_friends" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id_1" integer NOT NULL,
  "user_id_2" integer NOT NULL,
  "status" user_friend_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "user_followers" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "follower_user_id" integer NOT NULL,
  "followed_user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "tasks" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "title" varchar NOT NULL,
  "description" text,
  "status" task_status DEFAULT 'pending',
  "due_date" date,
  "priority" varchar DEFAULT 'medium',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "marketing_campaigns" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text,
  "campaign_type" marketing_campaign_type NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "budget_usd" decimal(12,2),
  "target_audience" varchar,
  "status" marketing_campaign_status DEFAULT 'draft',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "advertisements" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "campaign_id" integer,
  "title" varchar NOT NULL,
  "description" text,
  "media_url" varchar(255),
  "display_location" varchar,
  "impressions" integer DEFAULT 0,
  "clicks" integer DEFAULT 0,
  "sponsor_id" integer,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "equipment_marketplace" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "seller_user_id" integer NOT NULL,
  "brand_id" integer,
  "equipment_type" varchar NOT NULL,
  "model" varchar,
  "condition" varchar,
  "price_usd" decimal(10,2) NOT NULL,
  "description" text,
  "images" text,
  "status" marketplace_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "team_storefronts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "storefront_name" varchar NOT NULL,
  "description" text,
  "banner_image_url" varchar(255),
  "logo_url" varchar(255),
  "theme" storefront_theme DEFAULT 'default',
  "status" storefront_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "storefront_products" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "storefront_id" integer NOT NULL,
  "product_name" varchar NOT NULL,
  "description" text,
  "category" varchar NOT NULL,
  "price_usd" decimal(10,2) NOT NULL,
  "cost_usd" decimal(10,2),
  "sku" varchar UNIQUE,
  "images" text,
  "stock_quantity" integer DEFAULT 0,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "storefront_orders" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "storefront_id" integer NOT NULL,
  "customer_user_id" integer NOT NULL,
  "order_date" timestamp DEFAULT (now()),
  "shipping_address" text NOT NULL,
  "shipping_city" varchar,
  "shipping_country" varchar,
  "total_amount_usd" decimal(12,2) NOT NULL,
  "order_status" order_status DEFAULT 'pending',
  "shipment_id" integer,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "storefront_order_items" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "order_id" integer NOT NULL,
  "product_id" integer NOT NULL,
  "quantity" integer NOT NULL,
  "unit_price_usd" decimal(10,2) NOT NULL,
  "line_total_usd" decimal(12,2) NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "equipment_marketplace_transactions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "listing_id" integer NOT NULL,
  "buyer_user_id" integer NOT NULL,
  "seller_user_id" integer NOT NULL,
  "transaction_date" timestamp DEFAULT (now()),
  "price_usd" decimal(10,2) NOT NULL,
  "status" transaction_status DEFAULT 'pending',
  "shipping_address" text,
  "shipment_id" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "warehouses" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "address" text NOT NULL,
  "city" varchar(100) NOT NULL,
  "country" varchar NOT NULL,
  "manager_name" varchar,
  "manager_email" varchar(255),
  "capacity_units" integer,
  "current_inventory_units" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "shipments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "transaction_id" integer,
  "origin_warehouse_id" integer,
  "destination_address" text NOT NULL,
  "recipient_name" varchar NOT NULL,
  "recipient_email" varchar(255),
  "recipient_phone" varchar,
  "shipment_date" date,
  "expected_delivery_date" date,
  "actual_delivery_date" date,
  "delivery_method" delivery_method DEFAULT 'standard',
  "tracking_number" varchar UNIQUE,
  "status" shipment_status DEFAULT 'pending',
  "carrier_name" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "delivery_tracking" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "shipment_id" integer NOT NULL,
  "location" varchar,
  "status" varchar NOT NULL,
  "description" text,
  "timestamp" timestamp DEFAULT (now()),
  "recorded_at" timestamp DEFAULT (now())
);

CREATE TABLE "inventory_stock" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "warehouse_id" integer NOT NULL,
  "equipment_id" integer,
  "brand_id" integer,
  "equipment_type" varchar,
  "quantity_on_hand" integer DEFAULT 0,
  "quantity_reserved" integer DEFAULT 0,
  "quantity_available" integer DEFAULT 0,
  "reorder_level" integer DEFAULT 10,
  "updated_at" timestamp
);

CREATE TABLE "loan_contracts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "from_team_id" integer NOT NULL,
  "to_team_id" integer NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "terms" text,
  "status" loan_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "all_star_competitions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "description" text,
  "competition_date" date NOT NULL,
  "location" varchar,
  "status" varchar DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "all_star_selection" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "competition_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "selection_type" varchar DEFAULT 'voted',
  "voting_points" integer DEFAULT 0,
  "status" varchar DEFAULT 'selected',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "all_star_games" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "competition_id" integer NOT NULL,
  "game_date" date NOT NULL,
  "team_1_name" varchar,
  "team_2_name" varchar,
  "home_goals" integer DEFAULT 0,
  "away_goals" integer DEFAULT 0,
  "mvp_player_id" integer,
  "status" all_star_game_status DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "goal_songs" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "player_id" integer,
  "song_title" varchar NOT NULL,
  "artist" varchar,
  "audio_url" varchar(255),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "accolades" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "accolade_name" varchar NOT NULL,
  "description" text,
  "accolade_date" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "rink_dimensions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "venue_id" integer NOT NULL,
  "length_feet" integer,
  "width_feet" integer,
  "corner_radius_feet" decimal(5,2),
  "boards_height_inches" integer,
  "glass_height_inches" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "ice_conditions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "venue_id" integer NOT NULL,
  "last_measured_at" timestamp,
  "temperature_fahrenheit" decimal(5,2),
  "humidity_percent" decimal(5,2),
  "thickness_inches" decimal(3,2),
  "surface_condition" varchar,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "venue_locker_rooms" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "venue_id" integer NOT NULL,
  "room_name" varchar NOT NULL,
  "team_id" integer,
  "capacity" integer,
  "amenities" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "farm_teams" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "parent_team_id" integer NOT NULL,
  "farm_team_id" integer NOT NULL,
  "affiliation_level" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "salary_caps" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "cap_amount_usd" decimal(12,2) NOT NULL,
  "floor_amount_usd" decimal(12,2),
  "enabled" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_colors" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "color_name" varchar NOT NULL,
  "hex_code" varchar(7) NOT NULL,
  "color_type" varchar DEFAULT 'primary',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "polls" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "created_by_user_id" integer NOT NULL,
  "question" varchar NOT NULL,
  "description" text,
  "poll_type" poll_type DEFAULT 'single_choice',
  "status" poll_status DEFAULT 'active',
  "start_date" timestamp DEFAULT (now()),
  "end_date" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "poll_options" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "poll_id" integer NOT NULL,
  "option_text" varchar NOT NULL,
  "display_order" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "poll_responses" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "poll_id" integer NOT NULL,
  "poll_option_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "registration_forms" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "form_name" varchar NOT NULL,
  "form_type" varchar NOT NULL,
  "description" text,
  "fields_config" text,
  "status" registration_form_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "registration_submissions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "form_id" integer NOT NULL,
  "user_id" integer,
  "entity_type" varchar,
  "entity_id" integer,
  "form_data" text,
  "submission_status" registration_submission_status DEFAULT 'pending',
  "submitted_at" timestamp DEFAULT (now()),
  "reviewed_by_user_id" integer,
  "reviewed_at" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "personal_profiles" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "person_id" integer,
  "bio" text,
  "profile_picture_url" varchar(255),
  "logo_url" varchar(255),
  "phone" varchar,
  "address" text,
  "city" varchar,
  "country" varchar,
  "public_id" varchar UNIQUE,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "player_public_profiles" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "public_id" varchar UNIQUE,
  "is_public" boolean DEFAULT true,
  "bio" text,
  "profile_picture_url" varchar(255),
  "socials_visible" boolean DEFAULT true,
  "stats_visible" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "player_privacy_settings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "profile_visibility" varchar DEFAULT 'public',
  "show_real_name" boolean DEFAULT true,
  "show_stats" boolean DEFAULT true,
  "show_contact_info" boolean DEFAULT false,
  "show_social_media" boolean DEFAULT true,
  "show_location" boolean DEFAULT true,
  "allow_fan_messages" boolean DEFAULT true,
  "opt_out_public_display" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "user_privacy_settings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "profile_visibility" varchar DEFAULT 'public',
  "show_email" boolean DEFAULT false,
  "show_followers_list" boolean DEFAULT true,
  "allow_direct_messages" boolean DEFAULT true,
  "allow_game_invites" boolean DEFAULT true,
  "show_activity_status" boolean DEFAULT true,
  "show_favorite_teams" boolean DEFAULT true,
  "show_favorite_players" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "user_persons" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "person_id" integer NOT NULL,
  "relationship_type" entity_relationship NOT NULL,
  "status" varchar DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "user_permissions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "permission_key" varchar NOT NULL,
  "resource_type" varchar,
  "resource_id" integer,
  "granted_at" timestamp DEFAULT (now()),
  "expires_at" timestamp
);

CREATE TABLE "goaltender_stats" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "games_played" integer DEFAULT 0,
  "games_started" integer DEFAULT 0,
  "wins" integer DEFAULT 0,
  "losses" integer DEFAULT 0,
  "overtime_losses" integer DEFAULT 0,
  "shots_against" integer DEFAULT 0,
  "goals_against" integer DEFAULT 0,
  "saves" integer DEFAULT 0,
  "shutouts" integer DEFAULT 0,
  "save_percentage" decimal(5,3),
  "goals_against_average" decimal(5,2),
  "minutes_played" integer DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "player_ratings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "overall_rating" decimal(5,2),
  "offensive_rating" decimal(5,2),
  "defensive_rating" decimal(5,2),
  "physical_rating" decimal(5,2),
  "skating_rating" decimal(5,2),
  "updated_at" timestamp
);

CREATE TABLE "player_reputation_scores" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "score_type" varchar NOT NULL,
  "score_value" decimal(5,2),
  "review_count" integer DEFAULT 0,
  "last_updated_at" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_rankings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "position_category" varchar NOT NULL,
  "ranking_value" integer,
  "rank_date" date NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_stats" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "games_played" integer DEFAULT 0,
  "wins" integer DEFAULT 0,
  "losses" integer DEFAULT 0,
  "overtime_losses" integer DEFAULT 0,
  "goals_for" integer DEFAULT 0,
  "goals_against" integer DEFAULT 0,
  "power_play_goals" integer DEFAULT 0,
  "power_play_opportunities" integer DEFAULT 0,
  "penalty_kill_goals" integer DEFAULT 0,
  "penalty_kill_opportunities" integer DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "payroll_detail" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "contract_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "annual_salary" decimal(12,2),
  "bonus" decimal(12,2),
  "total_compensation" decimal(12,2),
  "updated_at" timestamp
);

CREATE TABLE "player_bonuses" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "bonus_type" varchar NOT NULL,
  "bonus_amount" decimal(12,2) NOT NULL,
  "reason" varchar,
  "earned_date" date NOT NULL,
  "paid_date" date,
  "status" bonus_status DEFAULT 'pending',
  "related_contract_id" integer,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_bonuses" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "bonus_type" varchar NOT NULL,
  "bonus_amount" decimal(12,2) NOT NULL,
  "reason" varchar,
  "earned_date" date NOT NULL,
  "paid_date" date,
  "status" bonus_status DEFAULT 'pending',
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "salary_cap_usage" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "total_committed" decimal(12,2),
  "cap_limit" decimal(12,2),
  "remaining_space" decimal(12,2),
  "updated_at" timestamp
);

CREATE TABLE "period_scoring" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "period" integer NOT NULL,
  "home_goals" integer DEFAULT 0,
  "away_goals" integer DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "game_weather" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "temperature_fahrenheit" decimal(5,2),
  "weather_condition" varchar,
  "wind_speed_mph" decimal(5,2),
  "humidity_percent" decimal(5,2),
  "notes" text,
  "recorded_at" timestamp DEFAULT (now())
);

CREATE TABLE "audit_logs" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "table_name" varchar NOT NULL,
  "record_id" integer NOT NULL,
  "action" varchar NOT NULL,
  "old_values" text,
  "new_values" text,
  "timestamp" timestamp DEFAULT (now())
);

CREATE TABLE "contract_history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "contract_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "status" varchar NOT NULL,
  "salary_annual" decimal(12,2),
  "start_date" date,
  "end_date" date,
  "changed_at" timestamp DEFAULT (now()),
  "changed_by_user_id" integer
);

CREATE TABLE "trade_history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "trade_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "from_team_id" integer NOT NULL,
  "to_team_id" integer NOT NULL,
  "status" varchar DEFAULT 'executed',
  "execution_date" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "transaction_history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "transaction_date" timestamp DEFAULT (now()),
  "transaction_type" varchar NOT NULL,
  "player_id" integer NOT NULL,
  "team_id" integer,
  "description" text,
  "notes" text
);

CREATE TABLE "playoff_brackets" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "bracket_name" varchar NOT NULL,
  "bracket_type" bracket_type NOT NULL,
  "total_teams" integer,
  "status" bracket_status DEFAULT 'draft',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "playoff_series" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "bracket_id" integer NOT NULL,
  "round" integer NOT NULL,
  "series_number" integer NOT NULL,
  "team_1_id" integer NOT NULL,
  "team_2_id" integer NOT NULL,
  "team_1_seed" integer,
  "team_2_seed" integer,
  "team_1_wins" integer DEFAULT 0,
  "team_2_wins" integer DEFAULT 0,
  "series_games" integer DEFAULT 7,
  "status" series_status DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "playoff_advancement" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "bracket_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "round" integer NOT NULL,
  "seed" integer,
  "advanced" boolean DEFAULT false,
  "eliminated_by_team_id" integer,
  "advanced_date" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "official_stats" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "official_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "games_officiated" integer DEFAULT 0,
  "penalties_called" integer DEFAULT 0,
  "major_penalties" integer DEFAULT 0,
  "minor_penalties" integer DEFAULT 0,
  "misconduct_penalties" integer DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "disciplinary_log" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "action_type" disciplinary_action NOT NULL,
  "reason" varchar NOT NULL,
  "action_date" date NOT NULL,
  "description" text,
  "issued_by_official_id" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_fines" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "fine_amount" decimal(10,2) NOT NULL,
  "reason" varchar NOT NULL,
  "fine_date" date NOT NULL,
  "status" fine_status DEFAULT 'pending',
  "paid_date" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_warnings" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "warning_type" varchar NOT NULL,
  "reason" varchar NOT NULL,
  "warning_date" date NOT NULL,
  "issued_by_official_id" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "coaches" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "coach_type" coach_type NOT NULL,
  "license_level" varchar,
  "specialization" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "coach_assignments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "coach_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "position" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "trainers" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "trainer_type" trainer_type NOT NULL,
  "certification" varchar,
  "specialization" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "trainer_assignments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "trainer_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "scouts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "scout_level" scout_level NOT NULL,
  "specialization" varchar,
  "organization_id" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "waiver_wire" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "season_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "released_by_team_id" integer NOT NULL,
  "release_date" date NOT NULL,
  "recall_date" date,
  "status" waiver_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "waiver_claims" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "waiver_id" integer NOT NULL,
  "claiming_team_id" integer NOT NULL,
  "claim_date" date NOT NULL,
  "priority_order" integer,
  "status" claim_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "trade_windows" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "window_name" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "trading_allowed" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "broadcast_rights" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer,
  "team_id" integer,
  "broadcaster_name" varchar NOT NULL,
  "broadcaster_type" varchar,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "contract_value" decimal(12,2),
  "territories" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "league_rules" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "rule_name" varchar UNIQUE NOT NULL,
  "rule_description" text NOT NULL,
  "rule_category" varchar,
  "effective_date" date,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "promotion_relegation_rules" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "promoted_teams_count" integer DEFAULT 0,
  "relegated_teams_count" integer DEFAULT 0,
  "promotion_criteria" text,
  "relegation_criteria" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "promotion_relegation_history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "from_division_id" integer,
  "to_division_id" integer NOT NULL,
  "movement_type" varchar NOT NULL,
  "finishing_position" integer,
  "reason" text,
  "executed_date" date,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "club_manager_options" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "organization_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "can_manage_teams" boolean DEFAULT false,
  "can_manage_leagues" boolean DEFAULT false,
  "can_manage_finances" boolean DEFAULT false,
  "can_manage_broadcast_rights" boolean DEFAULT false,
  "can_manage_sponsorships" boolean DEFAULT false,
  "can_approve_trades" boolean DEFAULT false,
  "can_manage_divisions" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "tickets" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "section_id" integer NOT NULL,
  "seat_number" varchar NOT NULL,
  "ticket_type" varchar,
  "price_usd" decimal(10,2),
  "status" varchar DEFAULT 'available',
  "purchased_by_user_id" integer,
  "purchase_date" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "seating_sections" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "venue_id" integer NOT NULL,
  "section_name" varchar NOT NULL,
  "section_level" integer,
  "capacity" integer,
  "section_type" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "seat_inventory" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "section_id" integer NOT NULL,
  "game_id" integer NOT NULL,
  "total_seats" integer,
  "available_seats" integer,
  "reserved_seats" integer,
  "updated_at" timestamp
);

CREATE TABLE "news" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar NOT NULL,
  "content" text NOT NULL,
  "author_user_id" integer NOT NULL,
  "news_category" news_category,
  "team_id" integer,
  "league_id" integer,
  "player_id" integer,
  "featured" boolean DEFAULT false,
  "published_date" timestamp DEFAULT (now()),
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "news_comments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "news_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "comment_text" text NOT NULL,
  "likes" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "fan_engagement" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "engagement_type" varchar NOT NULL,
  "team_id" integer,
  "player_id" integer,
  "game_id" integer,
  "engagement_date" timestamp DEFAULT (now())
);

CREATE TABLE "team_financials" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "total_revenue_usd" decimal(14,2) DEFAULT 0,
  "total_expenses_usd" decimal(14,2) DEFAULT 0,
  "net_income_usd" decimal(14,2) DEFAULT 0,
  "ticket_revenue_usd" decimal(14,2) DEFAULT 0,
  "merchandise_revenue_usd" decimal(14,2) DEFAULT 0,
  "sponsorship_revenue_usd" decimal(14,2) DEFAULT 0,
  "broadcast_revenue_usd" decimal(14,2) DEFAULT 0,
  "payroll_expenses_usd" decimal(14,2) DEFAULT 0,
  "arena_operating_expenses_usd" decimal(14,2) DEFAULT 0,
  "updated_at" timestamp
);

CREATE TABLE "financial_transactions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "transaction_type" varchar NOT NULL,
  "category" varchar NOT NULL,
  "amount_usd" decimal(14,2) NOT NULL,
  "description" text,
  "transaction_date" date NOT NULL,
  "related_entity_type" varchar,
  "related_entity_id" integer,
  "recorded_by_user_id" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "financial_reports" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "report_type" varchar NOT NULL,
  "report_date" date NOT NULL,
  "summary" text,
  "file_url" varchar(255),
  "created_by_user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "carpools" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "created_by_user_id" integer NOT NULL,
  "destination" varchar NOT NULL,
  "event_id" integer,
  "game_id" integer,
  "departure_date" date NOT NULL,
  "departure_time" time,
  "estimated_arrival_time" time,
  "vehicle_id" integer,
  "max_capacity" integer,
  "status" carpool_status DEFAULT 'open',
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "carpool_participants" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "carpool_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "is_driver" boolean DEFAULT false,
  "pickup_location" varchar,
  "status" carpool_participant_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "carpool_vehicles" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "vehicle_type" varchar NOT NULL,
  "make" varchar,
  "model" varchar,
  "year" integer,
  "license_plate" varchar,
  "seats_available" integer,
  "description" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_development_plans" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "coach_id" integer,
  "plan_type" varchar NOT NULL,
  "focus_areas" text NOT NULL,
  "goals" text,
  "start_date" date NOT NULL,
  "end_date" date,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "skill_assessments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "assessor_user_id" integer NOT NULL,
  "assessment_date" date NOT NULL,
  "skill_category" varchar NOT NULL,
  "score" integer CHECK (score >= 0 AND score <= 100),
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_milestones" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "contract_id" integer,
  "milestone_type" varchar NOT NULL,
  "description" text NOT NULL,
  "target_date" date,
  "achievement_date" date,
  "incentive_amount_usd" decimal(12,2),
  "status" milestone_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_milestones" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer,
  "milestone_type" varchar NOT NULL,
  "description" text NOT NULL,
  "target_date" date,
  "achievement_date" date,
  "milestone_category" varchar,
  "reward_amount_usd" decimal(12,2),
  "status" milestone_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "league_milestones" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "season_id" integer,
  "milestone_type" varchar NOT NULL,
  "description" text NOT NULL,
  "target_date" date,
  "achievement_date" date,
  "milestone_category" varchar,
  "significance_level" varchar,
  "notes" text,
  "status" milestone_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_progression_history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "recorded_date" date NOT NULL,
  "position_change" varchar,
  "potential_rating" decimal(5,2),
  "performance_notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "official_assignments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "official_id" integer NOT NULL,
  "league_id" integer NOT NULL,
  "assignment_date" date NOT NULL,
  "shift_type" varchar NOT NULL,
  "game_id" integer,
  "event_type" varchar,
  "location" varchar,
  "status" official_assignment_status DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "official_performance_feedback" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "official_id" integer NOT NULL,
  "game_id" integer NOT NULL,
  "feedback_provider_user_id" integer NOT NULL,
  "feedback_date" date NOT NULL,
  "fairness_rating" integer CHECK (fairness_rating >= 1 AND fairness_rating <= 5),
  "consistency_rating" integer CHECK (consistency_rating >= 1 AND consistency_rating <= 5),
  "communication_rating" integer CHECK (communication_rating >= 1 AND communication_rating <= 5),
  "comments" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "official_certification_renewals" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "official_id" integer NOT NULL,
  "renewal_date" date NOT NULL,
  "certification_type" varchar NOT NULL,
  "expiry_date" date NOT NULL,
  "training_completed" boolean DEFAULT false,
  "renewal_status" certification_status DEFAULT 'pending',
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "salary_cap_penalties" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "penalty_type" varchar NOT NULL,
  "penalty_amount_usd" decimal(12,2) NOT NULL,
  "reason" text NOT NULL,
  "issued_date" date NOT NULL,
  "paid_date" date,
  "status" varchar DEFAULT 'pending',
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "revenue_sharing_agreements" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "agreement_name" varchar NOT NULL,
  "description" text,
  "revenue_pool_usd" decimal(14,2),
  "distribution_formula" text,
  "start_date" date,
  "end_date" date,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "luxury_tax_calculations" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "league_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "payroll_total_usd" decimal(14,2) NOT NULL,
  "luxury_tax_threshold_usd" decimal(14,2) NOT NULL,
  "amount_over_threshold_usd" decimal(14,2),
  "tax_rate_percent" decimal(5,2),
  "tax_owed_usd" decimal(14,2),
  "tax_paid_usd" decimal(14,2),
  "status" varchar DEFAULT 'calculated',
  "updated_at" timestamp
);

CREATE TABLE "development_camps" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "organization_id" integer,
  "camp_name" varchar NOT NULL,
  "description" text,
  "camp_type" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "location" varchar,
  "capacity" integer,
  "age_group" varchar,
  "skill_level" varchar,
  "director_user_id" integer,
  "status" camp_status DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "development_camp_registrations" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "camp_id" integer NOT NULL,
  "participant_person_id" integer NOT NULL,
  "registration_date" date NOT NULL,
  "status" camp_registration_status DEFAULT 'registered',
  "attendance_status" varchar,
  "performance_notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "development_squad_rosters" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "squad_type" varchar NOT NULL,
  "squad_level" varchar DEFAULT 'u20',
  "player_id" integer NOT NULL,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_development_reports" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "reporting_period_start" date NOT NULL,
  "reporting_period_end" date NOT NULL,
  "coach_id" integer NOT NULL,
  "overall_progress_rating" integer CHECK (overall_progress_rating >= 1 AND overall_progress_rating <= 10),
  "strengths" text,
  "areas_for_improvement" text,
  "recommendations" text,
  "next_steps" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "game_timeouts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "period" integer NOT NULL,
  "time_in_period" varchar NOT NULL,
  "team_id" integer NOT NULL,
  "timeout_type" varchar DEFAULT 'standard',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "challenge_reviews" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "challenging_team_id" integer NOT NULL,
  "period" integer NOT NULL,
  "time_in_period" varchar NOT NULL,
  "challenge_type" varchar NOT NULL,
  "event_description" text,
  "review_outcome" varchar,
  "official_id" integer,
  "reviewed_at" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "play_by_play_log" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "sequence_number" integer NOT NULL,
  "period" integer NOT NULL,
  "time_in_period" varchar NOT NULL,
  "play_type" varchar NOT NULL,
  "player_id" integer,
  "team_id" integer,
  "description" text NOT NULL,
  "result" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "shot_charts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" integer NOT NULL,
  "player_id" integer NOT NULL,
  "team_id" integer NOT NULL,
  "period" integer NOT NULL,
  "time_in_period" varchar,
  "x_coordinate" decimal(5,2) NOT NULL,
  "y_coordinate" decimal(5,2) NOT NULL,
  "shot_type" varchar NOT NULL,
  "result" varchar DEFAULT 'miss',
  "distance_from_goal_feet" decimal(5,2),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "return_to_play_protocols" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "injury_type" varchar NOT NULL,
  "protocol_name" varchar NOT NULL,
  "description" text,
  "stages_count" integer DEFAULT 0,
  "estimated_days_total" integer,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "return_to_play_stages" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "protocol_id" integer NOT NULL,
  "stage_number" integer NOT NULL,
  "stage_name" varchar NOT NULL,
  "activities" text,
  "duration_days" integer,
  "clearance_required" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "clearance_sign_offs" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "protocol_id" integer NOT NULL,
  "stage_number" integer NOT NULL,
  "medical_staff_user_id" integer NOT NULL,
  "clearance_date" date NOT NULL,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "injury_prevention_programs" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "program_name" varchar NOT NULL,
  "description" text,
  "program_type" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "coordinator_user_id" integer,
  "status" varchar DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "sponsorship_deliverables" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "sponsorship_id" integer NOT NULL,
  "deliverable_name" varchar NOT NULL,
  "description" text,
  "deliverable_type" varchar NOT NULL,
  "quantity" integer,
  "delivery_date" date,
  "status" deliverable_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "partnership_performance_metrics" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "sponsorship_id" integer NOT NULL,
  "metric_name" varchar NOT NULL,
  "metric_type" varchar NOT NULL,
  "target_value" decimal(14,2),
  "actual_value" decimal(14,2),
  "measurement_date" date,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "partnership_disputes" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "sponsorship_id" integer NOT NULL,
  "dispute_date" date NOT NULL,
  "dispute_type" dispute_type NOT NULL,
  "description" text NOT NULL,
  "claimed_amount_usd" decimal(12,2),
  "resolution_status" dispute_status DEFAULT 'open',
  "resolution_date" date,
  "resolved_amount_usd" decimal(12,2),
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "premium_memberships" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "team_id" integer,
  "membership_tier" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "annual_fee_usd" decimal(12,2),
  "benefits" text,
  "status" membership_status DEFAULT 'active',
  "auto_renew" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "donation_campaigns" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "organization_id" integer,
  "team_id" integer,
  "campaign_name" varchar NOT NULL,
  "description" text,
  "campaign_type" varchar NOT NULL,
  "goal_amount_usd" decimal(12,2) NOT NULL,
  "raised_amount_usd" decimal(12,2) DEFAULT 0,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "status" campaign_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "donations" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "campaign_id" integer NOT NULL,
  "donor_user_id" integer NOT NULL,
  "donation_amount_usd" decimal(12,2) NOT NULL,
  "donation_date" date NOT NULL,
  "donation_method" varchar,
  "anonymous" boolean DEFAULT false,
  "tax_deductible" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "merchandise_waitlists" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "product_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "waitlist_position" integer,
  "email_notification_sent" boolean DEFAULT false,
  "notification_sent_at" timestamp,
  "status" waitlist_status DEFAULT 'waiting',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_reviews" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "reviewer_user_id" integer NOT NULL,
  "target_type" varchar NOT NULL,
  "target_id" integer NOT NULL,
  "rating_score" integer NOT NULL,
  "review_text" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "player_reviews" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "reviewer_user_id" integer NOT NULL,
  "rating_score" integer CHECK (rating_score >= 1 AND rating_score <= 5),
  "review_text" text,
  "helpful_count" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "user_favorites" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "favorite_type" varchar NOT NULL,
  "favorite_id" integer NOT NULL,
  "list_name" varchar DEFAULT 'default',
  "added_at" timestamp DEFAULT (now())
);

CREATE TABLE "search_history" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "search_query" varchar NOT NULL,
  "search_type" varchar,
  "result_count" integer,
  "searched_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_social_posts" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "post_text" text NOT NULL,
  "images" text,
  "player_id" integer,
  "team_id" integer,
  "game_id" integer,
  "post_type" varchar DEFAULT 'text',
  "visibility" varchar DEFAULT 'public',
  "like_count" integer DEFAULT 0,
  "comment_count" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "social_post_comments" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "post_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "comment_text" text NOT NULL,
  "like_count" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "social_post_likes" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "post_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "merchandise_reviews" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "product_id" integer NOT NULL,
  "reviewer_user_id" integer NOT NULL,
  "rating_score" integer NOT NULL,
  "review_text" text,
  "helpful_count" integer DEFAULT 0,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "fan_clubs" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text,
  "team_id" integer,
  "player_id" integer,
  "founder_user_id" integer NOT NULL,
  "logo_url" varchar(255),
  "member_count" integer DEFAULT 0,
  "status" fan_club_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "fan_club_memberships" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "fan_club_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "tier" fan_club_tier DEFAULT 'standard',
  "benefits" text,
  "joined_date" date NOT NULL,
  "status" membership_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_notification_preferences" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" integer NOT NULL,
  "notification_type" varchar NOT NULL,
  "channel" notification_channel NOT NULL,
  "enabled" boolean DEFAULT true,
  "frequency" notification_frequency DEFAULT 'immediately',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "venue_accessibility" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "venue_id" integer NOT NULL,
  "wheelchair_accessible" boolean DEFAULT false,
  "accessible_parking_spaces" integer,
  "accessible_restrooms" boolean DEFAULT false,
  "elevators" boolean DEFAULT false,
  "transit_options" text,
  "accessible_seating_sections" text,
  "features" accessibility_feature,
  "notes" text,
  "updated_at" timestamp
);

CREATE TABLE "player_medical_records" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "record_type" medical_record_type NOT NULL,
  "description" text NOT NULL,
  "record_date" date NOT NULL,
  "medical_provider" varchar,
  "confidential" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "doping_tests" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "player_id" integer NOT NULL,
  "test_date" date NOT NULL,
  "test_type" doping_test_type NOT NULL,
  "testing_authority" varchar,
  "result" doping_result DEFAULT 'pending',
  "test_details" text,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "background_checks" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "person_id" integer NOT NULL,
  "check_type" varchar NOT NULL,
  "check_date" date NOT NULL,
  "checking_authority" varchar,
  "result" check_result DEFAULT 'pending',
  "expiry_date" date,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "video_highlights" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" text,
  "video_url" varchar(255) NOT NULL,
  "thumbnail_url" varchar(255),
  "duration_seconds" integer,
  "game_id" integer,
  "player_id" integer,
  "team_id" integer,
  "highlight_type" varchar,
  "views" integer DEFAULT 0,
  "created_by_user_id" integer NOT NULL,
  "published_date" timestamp DEFAULT (now()),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "streaming_events" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text,
  "game_id" integer,
  "event_id" integer,
  "stream_url" varchar(255) NOT NULL,
  "platform" streaming_platform,
  "scheduled_start_time" timestamp,
  "actual_start_time" timestamp,
  "actual_end_time" timestamp,
  "viewer_count" integer DEFAULT 0,
  "status" stream_status DEFAULT 'scheduled',
  "created_by_user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "content_moderation" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "content_type" varchar NOT NULL,
  "content_id" integer NOT NULL,
  "flagged_by_user_id" integer,
  "reason" varchar NOT NULL,
  "status" content_moderation_status DEFAULT 'pending',
  "reviewed_by_user_id" integer,
  "moderation_notes" text,
  "action_taken" moderation_action,
  "created_at" timestamp DEFAULT (now()),
  "reviewed_at" timestamp
);

CREATE TABLE "practice_drills" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "drill_name" varchar NOT NULL,
  "description" text,
  "duration_minutes" integer,
  "difficulty_level" varchar DEFAULT 'intermediate',
  "equipment_needed" text,
  "created_by_user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "practice_drill_templates" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "drill_id" integer NOT NULL,
  "practice_id" integer NOT NULL,
  "order_in_practice" integer,
  "notes" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_equipment_inventory" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "equipment_type" varchar NOT NULL,
  "brand" varchar,
  "model" varchar,
  "quantity_on_hand" integer DEFAULT 0,
  "quantity_available" integer DEFAULT 0,
  "last_inventory_date" date,
  "storage_location" varchar,
  "notes" text,
  "updated_at" timestamp
);

CREATE TABLE "team_communication_channels" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "team_id" integer NOT NULL,
  "channel_name" varchar NOT NULL,
  "channel_type" channel_type NOT NULL,
  "description" text,
  "created_by_user_id" integer NOT NULL,
  "status" channel_status DEFAULT 'active',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "team_messages" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "channel_id" integer NOT NULL,
  "sender_user_id" integer NOT NULL,
  "message_text" text NOT NULL,
  "attachments" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_direct_messages" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "sender_user_id" integer NOT NULL,
  "recipient_user_id" integer NOT NULL,
  "message_text" text NOT NULL,
  "attachments" text,
  "is_read" boolean DEFAULT false,
  "read_at" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_comparisons" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "comparison_name" varchar NOT NULL,
  "description" text,
  "primary_player_id" integer NOT NULL,
  "season_id" integer NOT NULL,
  "comparison_metrics" text,
  "created_by_user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "player_comparison_results" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "comparison_id" integer NOT NULL,
  "compared_player_id" integer NOT NULL,
  "similarity_score" decimal(5,2),
  "analysis_summary" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "predictive_analytics_models" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "model_name" varchar NOT NULL,
  "model_type" varchar NOT NULL,
  "description" text,
  "target_metric" varchar,
  "status" model_status DEFAULT 'draft',
  "accuracy_score" decimal(5,2),
  "created_by_user_id" integer NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "predictive_analytics_results" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "model_id" integer NOT NULL,
  "player_id" integer,
  "team_id" integer,
  "season_id" integer,
  "prediction_data" text,
  "confidence_score" decimal(5,2),
  "generated_at" timestamp DEFAULT (now())
);

CREATE TABLE "calendar_events" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" text,
  "event_type" varchar NOT NULL,
  "event_date" timestamp NOT NULL,
  "end_time" timestamp,
  "location" varchar,
  "created_by_user_id" integer NOT NULL,
  "team_id" integer,
  "game_id" integer,
  "practice_id" integer,
  "generic_event_id" integer,
  "recurrence_pattern" varchar,
  "status" varchar DEFAULT 'scheduled',
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "calendar_attendees" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "calendar_event_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "attendance_status" varchar DEFAULT 'pending',
  "created_at" timestamp DEFAULT (now())
);

CREATE UNIQUE INDEX ON "rosters" ("team_id", "season_id", "player_id");

CREATE UNIQUE INDEX ON "lineups" ("game_id", "player_id", "team_id");

CREATE UNIQUE INDEX ON "practice_attendance" ("practice_id", "player_id");

CREATE UNIQUE INDEX ON "game_officials" ("game_id", "official_id");

CREATE UNIQUE INDEX ON "tournament_participants" ("tournament_id", "team_id");

CREATE INDEX ON "documents" ("entity_type", "entity_id");

CREATE INDEX ON "documents" ("uploaded_by_user_id");

CREATE UNIQUE INDEX ON "event_rsvp" ("event_id", "user_id");

CREATE UNIQUE INDEX ON "team_sponsors" ("team_id", "sponsor_id");

CREATE UNIQUE INDEX ON "admin_settings" ("league_id", "setting_key");

CREATE UNIQUE INDEX ON "admin_settings" ("organization_id", "setting_key");

CREATE UNIQUE INDEX ON "system_setup_wizard" ("league_id", "step_number");

CREATE UNIQUE INDEX ON "user_friends" ("user_id_1", "user_id_2");

CREATE UNIQUE INDEX ON "user_followers" ("follower_user_id", "followed_user_id");

CREATE UNIQUE INDEX ON "team_storefronts" ("team_id");

CREATE UNIQUE INDEX ON "inventory_stock" ("warehouse_id", "equipment_id");

CREATE UNIQUE INDEX ON "farm_teams" ("parent_team_id", "farm_team_id");

CREATE UNIQUE INDEX ON "salary_caps" ("league_id", "season_id");

CREATE UNIQUE INDEX ON "poll_responses" ("poll_id", "user_id");

CREATE UNIQUE INDEX ON "player_privacy_settings" ("player_id");

CREATE UNIQUE INDEX ON "user_privacy_settings" ("user_id");

CREATE UNIQUE INDEX ON "user_persons" ("user_id", "person_id");

CREATE UNIQUE INDEX ON "user_permissions" ("user_id", "permission_key", "resource_type", "resource_id");

CREATE UNIQUE INDEX ON "goaltender_stats" ("player_id", "season_id");

CREATE UNIQUE INDEX ON "player_ratings" ("player_id", "season_id");

CREATE UNIQUE INDEX ON "player_reputation_scores" ("player_id", "score_type");

CREATE INDEX ON "player_rankings" ("season_id", "position_category", "rank_date");

CREATE UNIQUE INDEX ON "team_stats" ("team_id", "season_id");

CREATE UNIQUE INDEX ON "payroll_detail" ("team_id", "season_id", "contract_id");

CREATE UNIQUE INDEX ON "salary_cap_usage" ("team_id", "season_id");

CREATE UNIQUE INDEX ON "period_scoring" ("game_id", "period");

CREATE INDEX ON "audit_logs" ("table_name", "record_id");

CREATE INDEX ON "audit_logs" ("user_id");

CREATE INDEX ON "audit_logs" ("timestamp");

CREATE UNIQUE INDEX ON "playoff_series" ("bracket_id", "round", "series_number");

CREATE UNIQUE INDEX ON "official_stats" ("official_id", "season_id");

CREATE UNIQUE INDEX ON "coach_assignments" ("coach_id", "team_id", "season_id");

CREATE UNIQUE INDEX ON "trainer_assignments" ("trainer_id", "team_id", "season_id");

CREATE UNIQUE INDEX ON "promotion_relegation_rules" ("league_id", "season_id");

CREATE UNIQUE INDEX ON "club_manager_options" ("organization_id", "user_id");

CREATE UNIQUE INDEX ON "tickets" ("game_id", "section_id", "seat_number");

CREATE UNIQUE INDEX ON "seat_inventory" ("section_id", "game_id");

CREATE INDEX ON "news" ("published_date");

CREATE INDEX ON "news" ("team_id");

CREATE INDEX ON "news" ("league_id");

CREATE UNIQUE INDEX ON "team_financials" ("team_id", "season_id");

CREATE UNIQUE INDEX ON "financial_reports" ("team_id", "season_id", "report_type");

CREATE UNIQUE INDEX ON "carpool_participants" ("carpool_id", "user_id");

CREATE UNIQUE INDEX ON "luxury_tax_calculations" ("league_id", "season_id", "team_id");

CREATE UNIQUE INDEX ON "development_squad_rosters" ("team_id", "season_id", "player_id");

CREATE UNIQUE INDEX ON "play_by_play_log" ("game_id", "sequence_number");

CREATE UNIQUE INDEX ON "merchandise_waitlists" ("product_id", "user_id");

CREATE UNIQUE INDEX ON "user_reviews" ("reviewer_user_id", "target_type", "target_id");

CREATE UNIQUE INDEX ON "player_reviews" ("player_id", "reviewer_user_id");

CREATE UNIQUE INDEX ON "user_favorites" ("user_id", "favorite_type", "favorite_id", "list_name");

CREATE UNIQUE INDEX ON "social_post_likes" ("post_id", "user_id");

CREATE UNIQUE INDEX ON "merchandise_reviews" ("product_id", "reviewer_user_id");

CREATE UNIQUE INDEX ON "fan_club_memberships" ("fan_club_id", "user_id");

CREATE UNIQUE INDEX ON "user_notification_preferences" ("user_id", "notification_type", "channel");

CREATE UNIQUE INDEX ON "venue_accessibility" ("venue_id");

CREATE INDEX ON "user_direct_messages" ("sender_user_id", "recipient_user_id");

CREATE UNIQUE INDEX ON "calendar_attendees" ("calendar_event_id", "user_id");

COMMENT ON COLUMN "users"."id" IS 'readonly';

COMMENT ON COLUMN "users"."email" IS 'display as email input';

COMMENT ON COLUMN "users"."password_hash" IS 'readonly';

COMMENT ON COLUMN "users"."created_at" IS 'readonly';

COMMENT ON COLUMN "users"."updated_at" IS 'readonly';

COMMENT ON COLUMN "persons"."id" IS 'readonly';

COMMENT ON COLUMN "persons"."bio" IS 'display as textarea';

COMMENT ON COLUMN "persons"."created_at" IS 'readonly';

COMMENT ON COLUMN "roles"."id" IS 'readonly';

COMMENT ON COLUMN "roles"."description" IS 'display as textarea';

COMMENT ON COLUMN "nationalities"."id" IS 'readonly';

COMMENT ON COLUMN "ruling_bodies"."id" IS 'readonly';

COMMENT ON COLUMN "ruling_bodies"."description" IS 'display as textarea';

COMMENT ON COLUMN "ruling_bodies"."created_at" IS 'readonly';

COMMENT ON COLUMN "organizations"."id" IS 'readonly';

COMMENT ON COLUMN "organizations"."type" IS 'display as dropdown';

COMMENT ON COLUMN "organizations"."created_at" IS 'readonly';

COMMENT ON COLUMN "leagues"."id" IS 'readonly';

COMMENT ON COLUMN "leagues"."level" IS 'display as dropdown';

COMMENT ON COLUMN "leagues"."created_at" IS 'readonly';

COMMENT ON COLUMN "seasons"."id" IS 'readonly';

COMMENT ON COLUMN "seasons"."created_at" IS 'readonly';

COMMENT ON COLUMN "divisions"."id" IS 'readonly';

COMMENT ON COLUMN "divisions"."created_at" IS 'readonly';

COMMENT ON COLUMN "teams"."id" IS 'readonly';

COMMENT ON COLUMN "teams"."city" IS 'requires valid city name format';

COMMENT ON COLUMN "teams"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "teams"."created_at" IS 'readonly';

COMMENT ON COLUMN "venues"."id" IS 'readonly';

COMMENT ON COLUMN "venues"."city" IS 'requires valid city name format';

COMMENT ON COLUMN "venues"."address" IS 'display as textarea';

COMMENT ON COLUMN "venues"."created_at" IS 'readonly';

COMMENT ON COLUMN "management"."id" IS 'readonly';

COMMENT ON COLUMN "management"."position" IS 'display as dropdown';

COMMENT ON COLUMN "management"."created_at" IS 'readonly';

COMMENT ON COLUMN "players"."id" IS 'readonly';

COMMENT ON COLUMN "players"."position" IS 'display as dropdown';

COMMENT ON COLUMN "players"."handedness" IS 'display as dropdown';

COMMENT ON COLUMN "players"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "players"."created_at" IS 'readonly';

COMMENT ON COLUMN "rosters"."id" IS 'readonly';

COMMENT ON COLUMN "rosters"."player_id" IS 'max 23 active roster players';

COMMENT ON COLUMN "lineups"."id" IS 'readonly';

COMMENT ON COLUMN "injuries"."id" IS 'readonly';

COMMENT ON COLUMN "injuries"."description" IS 'display as textarea';

COMMENT ON COLUMN "injuries"."created_at" IS 'readonly';

COMMENT ON COLUMN "suspensions"."id" IS 'readonly';

COMMENT ON COLUMN "suspensions"."created_at" IS 'readonly';

COMMENT ON COLUMN "free_agency"."id" IS 'readonly';

COMMENT ON COLUMN "free_agency"."notes" IS 'display as textarea';

COMMENT ON COLUMN "free_agency"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_equipment"."id" IS 'readonly';

COMMENT ON COLUMN "player_equipment"."description" IS 'display as textarea';

COMMENT ON COLUMN "player_equipment"."created_at" IS 'readonly';

COMMENT ON COLUMN "contracts"."id" IS 'readonly';

COMMENT ON COLUMN "contracts"."team_id" IS 'max 50 active contracts per team';

COMMENT ON COLUMN "contracts"."contract_type" IS 'display as dropdown';

COMMENT ON COLUMN "contracts"."created_at" IS 'readonly';

COMMENT ON COLUMN "trades"."id" IS 'readonly';

COMMENT ON COLUMN "trades"."notes" IS 'display as textarea';

COMMENT ON COLUMN "trades"."created_at" IS 'readonly';

COMMENT ON COLUMN "draft"."id" IS 'readonly';

COMMENT ON COLUMN "draft"."notes" IS 'display as textarea';

COMMENT ON COLUMN "draft"."created_at" IS 'readonly';

COMMENT ON COLUMN "games"."id" IS 'readonly';

COMMENT ON COLUMN "games"."created_at" IS 'readonly';

COMMENT ON COLUMN "game_setup"."id" IS 'readonly';

COMMENT ON COLUMN "game_setup"."created_at" IS 'readonly';

COMMENT ON COLUMN "game_settings"."id" IS 'readonly';

COMMENT ON COLUMN "game_settings"."created_at" IS 'readonly';

COMMENT ON COLUMN "game_events"."id" IS 'readonly';

COMMENT ON COLUMN "game_events"."description" IS 'display as textarea';

COMMENT ON COLUMN "game_events"."created_at" IS 'readonly';

COMMENT ON COLUMN "game_summaries"."id" IS 'readonly';

COMMENT ON COLUMN "game_summaries"."game_notes" IS 'display as textarea';

COMMENT ON COLUMN "game_summaries"."created_at" IS 'readonly';

COMMENT ON COLUMN "live_game_scoring"."id" IS 'readonly';

COMMENT ON COLUMN "player_stats"."id" IS 'readonly';

COMMENT ON COLUMN "player_stats"."updated_at" IS 'readonly';

COMMENT ON COLUMN "standings"."id" IS 'readonly';

COMMENT ON COLUMN "standings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "practices"."id" IS 'readonly';

COMMENT ON COLUMN "practices"."notes" IS 'display as textarea';

COMMENT ON COLUMN "practices"."created_at" IS 'readonly';

COMMENT ON COLUMN "practice_attendance"."id" IS 'readonly';

COMMENT ON COLUMN "officials"."id" IS 'readonly';

COMMENT ON COLUMN "officials"."created_at" IS 'readonly';

COMMENT ON COLUMN "game_officials"."id" IS 'readonly';

COMMENT ON COLUMN "tournaments"."id" IS 'readonly';

COMMENT ON COLUMN "tournaments"."tournament_type" IS 'display as dropdown';

COMMENT ON COLUMN "tournaments"."created_at" IS 'readonly';

COMMENT ON COLUMN "tournament_participants"."id" IS 'readonly';

COMMENT ON COLUMN "achievements"."id" IS 'readonly';

COMMENT ON COLUMN "achievements"."description" IS 'display as textarea';

COMMENT ON COLUMN "achievements"."created_at" IS 'readonly';

COMMENT ON COLUMN "awards"."id" IS 'readonly';

COMMENT ON COLUMN "awards"."created_at" IS 'readonly';

COMMENT ON COLUMN "social_media"."id" IS 'readonly';

COMMENT ON COLUMN "social_media"."profile_url" IS 'display as url/image input';

COMMENT ON COLUMN "social_media"."created_at" IS 'readonly';

COMMENT ON COLUMN "media"."id" IS 'readonly';

COMMENT ON COLUMN "media"."description" IS 'display as textarea';

COMMENT ON COLUMN "media"."url" IS 'display as url/image input';

COMMENT ON COLUMN "media"."created_at" IS 'readonly';

COMMENT ON COLUMN "documents"."id" IS 'readonly';

COMMENT ON COLUMN "documents"."document_type" IS 'display as dropdown';

COMMENT ON COLUMN "documents"."file_url" IS 'display as url/image input';

COMMENT ON COLUMN "documents"."entity_type" IS 'display as dropdown';

COMMENT ON COLUMN "documents"."access_level" IS 'display as dropdown';

COMMENT ON COLUMN "documents"."created_at" IS 'readonly';

COMMENT ON COLUMN "documents"."updated_at" IS 'readonly';

COMMENT ON COLUMN "document_access_logs"."id" IS 'readonly';

COMMENT ON COLUMN "events"."id" IS 'readonly';

COMMENT ON COLUMN "events"."description" IS 'display as textarea';

COMMENT ON COLUMN "events"."event_type" IS 'display as dropdown';

COMMENT ON COLUMN "events"."created_at" IS 'readonly';

COMMENT ON COLUMN "event_rsvp"."id" IS 'readonly';

COMMENT ON COLUMN "event_rsvp"."rsvp_status" IS 'display as dropdown';

COMMENT ON COLUMN "event_rsvp"."created_at" IS 'readonly';

COMMENT ON COLUMN "brands"."id" IS 'readonly';

COMMENT ON COLUMN "brands"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "brands"."description" IS 'display as textarea';

COMMENT ON COLUMN "brands"."created_at" IS 'readonly';

COMMENT ON COLUMN "manufacturers"."id" IS 'readonly';

COMMENT ON COLUMN "manufacturers"."contact_email" IS 'display as email input';

COMMENT ON COLUMN "manufacturers"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "manufacturers"."description" IS 'display as textarea';

COMMENT ON COLUMN "manufacturers"."created_at" IS 'readonly';

COMMENT ON COLUMN "retailers"."id" IS 'readonly';

COMMENT ON COLUMN "retailers"."email" IS 'display as email input';

COMMENT ON COLUMN "retailers"."address" IS 'display as textarea';

COMMENT ON COLUMN "retailers"."created_at" IS 'readonly';

COMMENT ON COLUMN "sponsors"."id" IS 'readonly';

COMMENT ON COLUMN "sponsors"."email" IS 'display as email input';

COMMENT ON COLUMN "sponsors"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "sponsors"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_sponsors"."id" IS 'readonly';

COMMENT ON COLUMN "settings"."id" IS 'readonly';

COMMENT ON COLUMN "settings"."description" IS 'display as textarea';

COMMENT ON COLUMN "settings"."created_at" IS 'readonly';

COMMENT ON COLUMN "settings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "admin_settings"."id" IS 'readonly';

COMMENT ON COLUMN "admin_settings"."description" IS 'display as textarea';

COMMENT ON COLUMN "admin_settings"."created_at" IS 'readonly';

COMMENT ON COLUMN "admin_settings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "system_setup_wizard"."id" IS 'readonly';

COMMENT ON COLUMN "system_setup_wizard"."created_at" IS 'readonly';

COMMENT ON COLUMN "system_setup_wizard"."updated_at" IS 'readonly';

COMMENT ON COLUMN "system_definitions"."id" IS 'readonly';

COMMENT ON COLUMN "system_definitions"."description" IS 'display as textarea';

COMMENT ON COLUMN "system_definitions"."created_at" IS 'readonly';

COMMENT ON COLUMN "scorekeeper_setup"."id" IS 'readonly';

COMMENT ON COLUMN "scorekeeper_setup"."created_at" IS 'readonly';

COMMENT ON COLUMN "scorekeeper_settings"."id" IS 'readonly';

COMMENT ON COLUMN "scorekeeper_settings"."created_at" IS 'readonly';

COMMENT ON COLUMN "scorekeeper_settings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "league_manager_options"."id" IS 'readonly';

COMMENT ON COLUMN "league_manager_options"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_manager_options"."id" IS 'readonly';

COMMENT ON COLUMN "team_manager_options"."created_at" IS 'readonly';

COMMENT ON COLUMN "personalisation"."id" IS 'readonly';

COMMENT ON COLUMN "personalisation"."created_at" IS 'readonly';

COMMENT ON COLUMN "personalisation"."updated_at" IS 'readonly';

COMMENT ON COLUMN "user_friends"."id" IS 'readonly';

COMMENT ON COLUMN "user_friends"."status" IS 'display as dropdown';

COMMENT ON COLUMN "user_friends"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_friends"."updated_at" IS 'readonly';

COMMENT ON COLUMN "user_followers"."id" IS 'readonly';

COMMENT ON COLUMN "user_followers"."created_at" IS 'readonly';

COMMENT ON COLUMN "tasks"."id" IS 'readonly';

COMMENT ON COLUMN "tasks"."description" IS 'display as textarea';

COMMENT ON COLUMN "tasks"."status" IS 'display as dropdown';

COMMENT ON COLUMN "tasks"."created_at" IS 'readonly';

COMMENT ON COLUMN "tasks"."updated_at" IS 'readonly';

COMMENT ON COLUMN "marketing_campaigns"."id" IS 'readonly';

COMMENT ON COLUMN "marketing_campaigns"."description" IS 'display as textarea';

COMMENT ON COLUMN "marketing_campaigns"."campaign_type" IS 'display as dropdown';

COMMENT ON COLUMN "marketing_campaigns"."status" IS 'display as dropdown';

COMMENT ON COLUMN "marketing_campaigns"."created_at" IS 'readonly';

COMMENT ON COLUMN "marketing_campaigns"."updated_at" IS 'readonly';

COMMENT ON COLUMN "advertisements"."id" IS 'readonly';

COMMENT ON COLUMN "advertisements"."description" IS 'display as textarea';

COMMENT ON COLUMN "advertisements"."media_url" IS 'display as url/image input';

COMMENT ON COLUMN "advertisements"."created_at" IS 'readonly';

COMMENT ON COLUMN "advertisements"."updated_at" IS 'readonly';

COMMENT ON COLUMN "equipment_marketplace"."id" IS 'readonly';

COMMENT ON COLUMN "equipment_marketplace"."description" IS 'display as textarea';

COMMENT ON COLUMN "equipment_marketplace"."created_at" IS 'readonly';

COMMENT ON COLUMN "equipment_marketplace"."updated_at" IS 'readonly';

COMMENT ON COLUMN "team_storefronts"."id" IS 'readonly';

COMMENT ON COLUMN "team_storefronts"."description" IS 'display as textarea';

COMMENT ON COLUMN "team_storefronts"."banner_image_url" IS 'display as url/image input';

COMMENT ON COLUMN "team_storefronts"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "team_storefronts"."theme" IS 'display as dropdown';

COMMENT ON COLUMN "team_storefronts"."status" IS 'display as dropdown';

COMMENT ON COLUMN "team_storefronts"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_storefronts"."updated_at" IS 'readonly';

COMMENT ON COLUMN "storefront_products"."id" IS 'readonly';

COMMENT ON COLUMN "storefront_products"."description" IS 'display as textarea';

COMMENT ON COLUMN "storefront_products"."status" IS 'display as dropdown';

COMMENT ON COLUMN "storefront_products"."created_at" IS 'readonly';

COMMENT ON COLUMN "storefront_products"."updated_at" IS 'readonly';

COMMENT ON COLUMN "storefront_orders"."id" IS 'readonly';

COMMENT ON COLUMN "storefront_orders"."created_at" IS 'readonly';

COMMENT ON COLUMN "storefront_orders"."updated_at" IS 'readonly';

COMMENT ON COLUMN "storefront_order_items"."id" IS 'readonly';

COMMENT ON COLUMN "storefront_order_items"."created_at" IS 'readonly';

COMMENT ON COLUMN "equipment_marketplace_transactions"."id" IS 'readonly';

COMMENT ON COLUMN "equipment_marketplace_transactions"."shipping_address" IS 'display as textarea';

COMMENT ON COLUMN "equipment_marketplace_transactions"."created_at" IS 'readonly';

COMMENT ON COLUMN "warehouses"."id" IS 'readonly';

COMMENT ON COLUMN "warehouses"."city" IS 'requires valid city name format';

COMMENT ON COLUMN "warehouses"."manager_email" IS 'display as email input';

COMMENT ON COLUMN "warehouses"."created_at" IS 'readonly';

COMMENT ON COLUMN "shipments"."id" IS 'readonly';

COMMENT ON COLUMN "shipments"."recipient_email" IS 'display as email input';

COMMENT ON COLUMN "shipments"."created_at" IS 'readonly';

COMMENT ON COLUMN "shipments"."updated_at" IS 'readonly';

COMMENT ON COLUMN "delivery_tracking"."id" IS 'readonly';

COMMENT ON COLUMN "delivery_tracking"."status" IS 'display as dropdown';

COMMENT ON COLUMN "delivery_tracking"."description" IS 'display as textarea';

COMMENT ON COLUMN "inventory_stock"."id" IS 'readonly';

COMMENT ON COLUMN "inventory_stock"."updated_at" IS 'readonly';

COMMENT ON COLUMN "loan_contracts"."id" IS 'readonly';

COMMENT ON COLUMN "loan_contracts"."to_team_id" IS 'max 50 active contracts per team';

COMMENT ON COLUMN "loan_contracts"."status" IS 'display as dropdown';

COMMENT ON COLUMN "loan_contracts"."created_at" IS 'readonly';

COMMENT ON COLUMN "loan_contracts"."updated_at" IS 'readonly';

COMMENT ON COLUMN "all_star_competitions"."id" IS 'readonly';

COMMENT ON COLUMN "all_star_competitions"."description" IS 'display as textarea';

COMMENT ON COLUMN "all_star_competitions"."status" IS 'display as dropdown';

COMMENT ON COLUMN "all_star_competitions"."created_at" IS 'readonly';

COMMENT ON COLUMN "all_star_selection"."id" IS 'readonly';

COMMENT ON COLUMN "all_star_selection"."status" IS 'display as dropdown';

COMMENT ON COLUMN "all_star_selection"."created_at" IS 'readonly';

COMMENT ON COLUMN "all_star_games"."id" IS 'readonly';

COMMENT ON COLUMN "all_star_games"."status" IS 'display as dropdown';

COMMENT ON COLUMN "all_star_games"."created_at" IS 'readonly';

COMMENT ON COLUMN "goal_songs"."id" IS 'readonly';

COMMENT ON COLUMN "goal_songs"."audio_url" IS 'display as url/image input';

COMMENT ON COLUMN "goal_songs"."created_at" IS 'readonly';

COMMENT ON COLUMN "accolades"."id" IS 'readonly';

COMMENT ON COLUMN "accolades"."description" IS 'display as textarea';

COMMENT ON COLUMN "accolades"."created_at" IS 'readonly';

COMMENT ON COLUMN "rink_dimensions"."id" IS 'readonly';

COMMENT ON COLUMN "rink_dimensions"."created_at" IS 'readonly';

COMMENT ON COLUMN "ice_conditions"."id" IS 'readonly';

COMMENT ON COLUMN "ice_conditions"."notes" IS 'display as textarea';

COMMENT ON COLUMN "ice_conditions"."created_at" IS 'readonly';

COMMENT ON COLUMN "venue_locker_rooms"."id" IS 'readonly';

COMMENT ON COLUMN "venue_locker_rooms"."created_at" IS 'readonly';

COMMENT ON COLUMN "farm_teams"."id" IS 'readonly';

COMMENT ON COLUMN "farm_teams"."created_at" IS 'readonly';

COMMENT ON COLUMN "salary_caps"."id" IS 'readonly';

COMMENT ON COLUMN "salary_caps"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_colors"."id" IS 'readonly';

COMMENT ON COLUMN "team_colors"."created_at" IS 'readonly';

COMMENT ON COLUMN "polls"."id" IS 'readonly';

COMMENT ON COLUMN "polls"."description" IS 'display as textarea';

COMMENT ON COLUMN "polls"."created_at" IS 'readonly';

COMMENT ON COLUMN "poll_options"."id" IS 'readonly';

COMMENT ON COLUMN "poll_options"."created_at" IS 'readonly';

COMMENT ON COLUMN "poll_responses"."id" IS 'readonly';

COMMENT ON COLUMN "poll_responses"."created_at" IS 'readonly';

COMMENT ON COLUMN "registration_forms"."id" IS 'readonly';

COMMENT ON COLUMN "registration_forms"."description" IS 'display as textarea';

COMMENT ON COLUMN "registration_forms"."status" IS 'display as dropdown';

COMMENT ON COLUMN "registration_forms"."created_at" IS 'readonly';

COMMENT ON COLUMN "registration_forms"."updated_at" IS 'readonly';

COMMENT ON COLUMN "registration_submissions"."id" IS 'readonly';

COMMENT ON COLUMN "registration_submissions"."submission_status" IS 'display as dropdown';

COMMENT ON COLUMN "registration_submissions"."created_at" IS 'readonly';

COMMENT ON COLUMN "personal_profiles"."id" IS 'readonly';

COMMENT ON COLUMN "personal_profiles"."bio" IS 'display as textarea';

COMMENT ON COLUMN "personal_profiles"."profile_picture_url" IS 'display as url/image input';

COMMENT ON COLUMN "personal_profiles"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "personal_profiles"."address" IS 'display as textarea';

COMMENT ON COLUMN "personal_profiles"."created_at" IS 'readonly';

COMMENT ON COLUMN "personal_profiles"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_public_profiles"."id" IS 'readonly';

COMMENT ON COLUMN "player_public_profiles"."bio" IS 'display as textarea';

COMMENT ON COLUMN "player_public_profiles"."profile_picture_url" IS 'display as url/image input';

COMMENT ON COLUMN "player_public_profiles"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_public_profiles"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_privacy_settings"."id" IS 'readonly';

COMMENT ON COLUMN "player_privacy_settings"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_privacy_settings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "user_privacy_settings"."id" IS 'readonly';

COMMENT ON COLUMN "user_privacy_settings"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_privacy_settings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "user_persons"."id" IS 'readonly';

COMMENT ON COLUMN "user_persons"."status" IS 'display as dropdown';

COMMENT ON COLUMN "user_persons"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_persons"."updated_at" IS 'readonly';

COMMENT ON COLUMN "user_permissions"."id" IS 'readonly';

COMMENT ON COLUMN "goaltender_stats"."id" IS 'readonly';

COMMENT ON COLUMN "goaltender_stats"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_ratings"."id" IS 'readonly';

COMMENT ON COLUMN "player_ratings"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_reputation_scores"."id" IS 'readonly';

COMMENT ON COLUMN "player_reputation_scores"."last_updated_at" IS 'readonly';

COMMENT ON COLUMN "player_reputation_scores"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_rankings"."id" IS 'readonly';

COMMENT ON COLUMN "player_rankings"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_stats"."id" IS 'readonly';

COMMENT ON COLUMN "team_stats"."updated_at" IS 'readonly';

COMMENT ON COLUMN "payroll_detail"."id" IS 'readonly';

COMMENT ON COLUMN "payroll_detail"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_bonuses"."id" IS 'readonly';

COMMENT ON COLUMN "player_bonuses"."status" IS 'display as dropdown';

COMMENT ON COLUMN "player_bonuses"."notes" IS 'display as textarea';

COMMENT ON COLUMN "player_bonuses"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_bonuses"."id" IS 'readonly';

COMMENT ON COLUMN "team_bonuses"."status" IS 'display as dropdown';

COMMENT ON COLUMN "team_bonuses"."notes" IS 'display as textarea';

COMMENT ON COLUMN "team_bonuses"."created_at" IS 'readonly';

COMMENT ON COLUMN "salary_cap_usage"."id" IS 'readonly';

COMMENT ON COLUMN "salary_cap_usage"."updated_at" IS 'readonly';

COMMENT ON COLUMN "period_scoring"."id" IS 'readonly';

COMMENT ON COLUMN "period_scoring"."updated_at" IS 'readonly';

COMMENT ON COLUMN "game_weather"."id" IS 'readonly';

COMMENT ON COLUMN "game_weather"."notes" IS 'display as textarea';

COMMENT ON COLUMN "audit_logs"."id" IS 'readonly';

COMMENT ON COLUMN "contract_history"."id" IS 'readonly';

COMMENT ON COLUMN "contract_history"."status" IS 'display as dropdown';

COMMENT ON COLUMN "trade_history"."id" IS 'readonly';

COMMENT ON COLUMN "trade_history"."status" IS 'display as dropdown';

COMMENT ON COLUMN "trade_history"."created_at" IS 'readonly';

COMMENT ON COLUMN "transaction_history"."id" IS 'readonly';

COMMENT ON COLUMN "transaction_history"."description" IS 'display as textarea';

COMMENT ON COLUMN "transaction_history"."notes" IS 'display as textarea';

COMMENT ON COLUMN "playoff_brackets"."id" IS 'readonly';

COMMENT ON COLUMN "playoff_brackets"."bracket_type" IS 'display as dropdown';

COMMENT ON COLUMN "playoff_brackets"."status" IS 'display as dropdown';

COMMENT ON COLUMN "playoff_brackets"."created_at" IS 'readonly';

COMMENT ON COLUMN "playoff_brackets"."updated_at" IS 'readonly';

COMMENT ON COLUMN "playoff_series"."id" IS 'readonly';

COMMENT ON COLUMN "playoff_series"."status" IS 'display as dropdown';

COMMENT ON COLUMN "playoff_series"."created_at" IS 'readonly';

COMMENT ON COLUMN "playoff_series"."updated_at" IS 'readonly';

COMMENT ON COLUMN "playoff_advancement"."id" IS 'readonly';

COMMENT ON COLUMN "playoff_advancement"."created_at" IS 'readonly';

COMMENT ON COLUMN "official_stats"."id" IS 'readonly';

COMMENT ON COLUMN "official_stats"."updated_at" IS 'readonly';

COMMENT ON COLUMN "disciplinary_log"."id" IS 'readonly';

COMMENT ON COLUMN "disciplinary_log"."description" IS 'display as textarea';

COMMENT ON COLUMN "disciplinary_log"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_fines"."id" IS 'readonly';

COMMENT ON COLUMN "player_fines"."status" IS 'display as dropdown';

COMMENT ON COLUMN "player_fines"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_warnings"."id" IS 'readonly';

COMMENT ON COLUMN "player_warnings"."created_at" IS 'readonly';

COMMENT ON COLUMN "coaches"."id" IS 'readonly';

COMMENT ON COLUMN "coaches"."created_at" IS 'readonly';

COMMENT ON COLUMN "coach_assignments"."id" IS 'readonly';

COMMENT ON COLUMN "coach_assignments"."status" IS 'display as dropdown';

COMMENT ON COLUMN "coach_assignments"."created_at" IS 'readonly';

COMMENT ON COLUMN "trainers"."id" IS 'readonly';

COMMENT ON COLUMN "trainers"."created_at" IS 'readonly';

COMMENT ON COLUMN "trainer_assignments"."id" IS 'readonly';

COMMENT ON COLUMN "trainer_assignments"."status" IS 'display as dropdown';

COMMENT ON COLUMN "trainer_assignments"."created_at" IS 'readonly';

COMMENT ON COLUMN "scouts"."id" IS 'readonly';

COMMENT ON COLUMN "scouts"."created_at" IS 'readonly';

COMMENT ON COLUMN "waiver_wire"."id" IS 'readonly';

COMMENT ON COLUMN "waiver_wire"."status" IS 'display as dropdown';

COMMENT ON COLUMN "waiver_wire"."created_at" IS 'readonly';

COMMENT ON COLUMN "waiver_wire"."updated_at" IS 'readonly';

COMMENT ON COLUMN "waiver_claims"."id" IS 'readonly';

COMMENT ON COLUMN "waiver_claims"."status" IS 'display as dropdown';

COMMENT ON COLUMN "waiver_claims"."created_at" IS 'readonly';

COMMENT ON COLUMN "trade_windows"."id" IS 'readonly';

COMMENT ON COLUMN "trade_windows"."created_at" IS 'readonly';

COMMENT ON COLUMN "broadcast_rights"."id" IS 'readonly';

COMMENT ON COLUMN "broadcast_rights"."created_at" IS 'readonly';

COMMENT ON COLUMN "league_rules"."id" IS 'readonly';

COMMENT ON COLUMN "league_rules"."created_at" IS 'readonly';

COMMENT ON COLUMN "league_rules"."updated_at" IS 'readonly';

COMMENT ON COLUMN "promotion_relegation_rules"."id" IS 'readonly';

COMMENT ON COLUMN "promotion_relegation_rules"."created_at" IS 'readonly';

COMMENT ON COLUMN "promotion_relegation_rules"."updated_at" IS 'readonly';

COMMENT ON COLUMN "promotion_relegation_history"."id" IS 'readonly';

COMMENT ON COLUMN "promotion_relegation_history"."created_at" IS 'readonly';

COMMENT ON COLUMN "club_manager_options"."id" IS 'readonly';

COMMENT ON COLUMN "club_manager_options"."created_at" IS 'readonly';

COMMENT ON COLUMN "tickets"."id" IS 'readonly';

COMMENT ON COLUMN "tickets"."status" IS 'display as dropdown';

COMMENT ON COLUMN "tickets"."created_at" IS 'readonly';

COMMENT ON COLUMN "seating_sections"."id" IS 'readonly';

COMMENT ON COLUMN "seating_sections"."created_at" IS 'readonly';

COMMENT ON COLUMN "seat_inventory"."id" IS 'readonly';

COMMENT ON COLUMN "seat_inventory"."updated_at" IS 'readonly';

COMMENT ON COLUMN "news"."id" IS 'readonly';

COMMENT ON COLUMN "news"."created_at" IS 'readonly';

COMMENT ON COLUMN "news"."updated_at" IS 'readonly';

COMMENT ON COLUMN "news_comments"."id" IS 'readonly';

COMMENT ON COLUMN "news_comments"."created_at" IS 'readonly';

COMMENT ON COLUMN "news_comments"."updated_at" IS 'readonly';

COMMENT ON COLUMN "fan_engagement"."id" IS 'readonly';

COMMENT ON COLUMN "team_financials"."id" IS 'readonly';

COMMENT ON COLUMN "team_financials"."updated_at" IS 'readonly';

COMMENT ON COLUMN "financial_transactions"."id" IS 'readonly';

COMMENT ON COLUMN "financial_transactions"."description" IS 'display as textarea';

COMMENT ON COLUMN "financial_transactions"."created_at" IS 'readonly';

COMMENT ON COLUMN "financial_reports"."id" IS 'readonly';

COMMENT ON COLUMN "financial_reports"."file_url" IS 'display as url/image input';

COMMENT ON COLUMN "financial_reports"."created_at" IS 'readonly';

COMMENT ON COLUMN "carpools"."id" IS 'readonly';

COMMENT ON COLUMN "carpools"."status" IS 'display as dropdown';

COMMENT ON COLUMN "carpools"."notes" IS 'display as textarea';

COMMENT ON COLUMN "carpools"."created_at" IS 'readonly';

COMMENT ON COLUMN "carpool_participants"."id" IS 'readonly';

COMMENT ON COLUMN "carpool_participants"."status" IS 'display as dropdown';

COMMENT ON COLUMN "carpool_participants"."created_at" IS 'readonly';

COMMENT ON COLUMN "carpool_vehicles"."id" IS 'readonly';

COMMENT ON COLUMN "carpool_vehicles"."description" IS 'display as textarea';

COMMENT ON COLUMN "carpool_vehicles"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_development_plans"."id" IS 'readonly';

COMMENT ON COLUMN "player_development_plans"."status" IS 'display as dropdown';

COMMENT ON COLUMN "player_development_plans"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_development_plans"."updated_at" IS 'readonly';

COMMENT ON COLUMN "skill_assessments"."id" IS 'readonly';

COMMENT ON COLUMN "skill_assessments"."notes" IS 'display as textarea';

COMMENT ON COLUMN "skill_assessments"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_milestones"."id" IS 'readonly';

COMMENT ON COLUMN "player_milestones"."status" IS 'display as dropdown';

COMMENT ON COLUMN "player_milestones"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_milestones"."id" IS 'readonly';

COMMENT ON COLUMN "team_milestones"."status" IS 'display as dropdown';

COMMENT ON COLUMN "team_milestones"."created_at" IS 'readonly';

COMMENT ON COLUMN "league_milestones"."id" IS 'readonly';

COMMENT ON COLUMN "league_milestones"."notes" IS 'display as textarea';

COMMENT ON COLUMN "league_milestones"."status" IS 'display as dropdown';

COMMENT ON COLUMN "league_milestones"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_progression_history"."id" IS 'readonly';

COMMENT ON COLUMN "player_progression_history"."performance_notes" IS 'display as textarea';

COMMENT ON COLUMN "player_progression_history"."created_at" IS 'readonly';

COMMENT ON COLUMN "official_assignments"."id" IS 'readonly';

COMMENT ON COLUMN "official_assignments"."created_at" IS 'readonly';

COMMENT ON COLUMN "official_performance_feedback"."id" IS 'readonly';

COMMENT ON COLUMN "official_performance_feedback"."comments" IS 'display as textarea';

COMMENT ON COLUMN "official_performance_feedback"."created_at" IS 'readonly';

COMMENT ON COLUMN "official_certification_renewals"."id" IS 'readonly';

COMMENT ON COLUMN "official_certification_renewals"."notes" IS 'display as textarea';

COMMENT ON COLUMN "official_certification_renewals"."created_at" IS 'readonly';

COMMENT ON COLUMN "salary_cap_penalties"."id" IS 'readonly';

COMMENT ON COLUMN "salary_cap_penalties"."status" IS 'display as dropdown';

COMMENT ON COLUMN "salary_cap_penalties"."notes" IS 'display as textarea';

COMMENT ON COLUMN "salary_cap_penalties"."created_at" IS 'readonly';

COMMENT ON COLUMN "revenue_sharing_agreements"."id" IS 'readonly';

COMMENT ON COLUMN "revenue_sharing_agreements"."description" IS 'display as textarea';

COMMENT ON COLUMN "revenue_sharing_agreements"."status" IS 'display as dropdown';

COMMENT ON COLUMN "revenue_sharing_agreements"."created_at" IS 'readonly';

COMMENT ON COLUMN "luxury_tax_calculations"."id" IS 'readonly';

COMMENT ON COLUMN "luxury_tax_calculations"."status" IS 'display as dropdown';

COMMENT ON COLUMN "luxury_tax_calculations"."updated_at" IS 'readonly';

COMMENT ON COLUMN "development_camps"."id" IS 'readonly';

COMMENT ON COLUMN "development_camps"."description" IS 'display as textarea';

COMMENT ON COLUMN "development_camps"."status" IS 'display as dropdown';

COMMENT ON COLUMN "development_camps"."created_at" IS 'readonly';

COMMENT ON COLUMN "development_camp_registrations"."id" IS 'readonly';

COMMENT ON COLUMN "development_camp_registrations"."status" IS 'display as dropdown';

COMMENT ON COLUMN "development_camp_registrations"."performance_notes" IS 'display as textarea';

COMMENT ON COLUMN "development_camp_registrations"."created_at" IS 'readonly';

COMMENT ON COLUMN "development_squad_rosters"."id" IS 'readonly';

COMMENT ON COLUMN "development_squad_rosters"."status" IS 'display as dropdown';

COMMENT ON COLUMN "development_squad_rosters"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_development_reports"."id" IS 'readonly';

COMMENT ON COLUMN "player_development_reports"."created_at" IS 'readonly';

COMMENT ON COLUMN "game_timeouts"."id" IS 'readonly';

COMMENT ON COLUMN "game_timeouts"."created_at" IS 'readonly';

COMMENT ON COLUMN "challenge_reviews"."id" IS 'readonly';

COMMENT ON COLUMN "challenge_reviews"."event_description" IS 'display as textarea';

COMMENT ON COLUMN "challenge_reviews"."created_at" IS 'readonly';

COMMENT ON COLUMN "play_by_play_log"."id" IS 'readonly';

COMMENT ON COLUMN "play_by_play_log"."created_at" IS 'readonly';

COMMENT ON COLUMN "shot_charts"."id" IS 'readonly';

COMMENT ON COLUMN "shot_charts"."created_at" IS 'readonly';

COMMENT ON COLUMN "return_to_play_protocols"."id" IS 'readonly';

COMMENT ON COLUMN "return_to_play_protocols"."description" IS 'display as textarea';

COMMENT ON COLUMN "return_to_play_protocols"."created_at" IS 'readonly';

COMMENT ON COLUMN "return_to_play_protocols"."updated_at" IS 'readonly';

COMMENT ON COLUMN "return_to_play_stages"."id" IS 'readonly';

COMMENT ON COLUMN "return_to_play_stages"."created_at" IS 'readonly';

COMMENT ON COLUMN "clearance_sign_offs"."id" IS 'readonly';

COMMENT ON COLUMN "clearance_sign_offs"."notes" IS 'display as textarea';

COMMENT ON COLUMN "clearance_sign_offs"."created_at" IS 'readonly';

COMMENT ON COLUMN "injury_prevention_programs"."id" IS 'readonly';

COMMENT ON COLUMN "injury_prevention_programs"."description" IS 'display as textarea';

COMMENT ON COLUMN "injury_prevention_programs"."status" IS 'display as dropdown';

COMMENT ON COLUMN "injury_prevention_programs"."created_at" IS 'readonly';

COMMENT ON COLUMN "sponsorship_deliverables"."id" IS 'readonly';

COMMENT ON COLUMN "sponsorship_deliverables"."description" IS 'display as textarea';

COMMENT ON COLUMN "sponsorship_deliverables"."status" IS 'display as dropdown';

COMMENT ON COLUMN "sponsorship_deliverables"."created_at" IS 'readonly';

COMMENT ON COLUMN "partnership_performance_metrics"."id" IS 'readonly';

COMMENT ON COLUMN "partnership_performance_metrics"."notes" IS 'display as textarea';

COMMENT ON COLUMN "partnership_performance_metrics"."created_at" IS 'readonly';

COMMENT ON COLUMN "partnership_disputes"."id" IS 'readonly';

COMMENT ON COLUMN "partnership_disputes"."notes" IS 'display as textarea';

COMMENT ON COLUMN "partnership_disputes"."created_at" IS 'readonly';

COMMENT ON COLUMN "premium_memberships"."id" IS 'readonly';

COMMENT ON COLUMN "premium_memberships"."status" IS 'display as dropdown';

COMMENT ON COLUMN "premium_memberships"."created_at" IS 'readonly';

COMMENT ON COLUMN "premium_memberships"."updated_at" IS 'readonly';

COMMENT ON COLUMN "donation_campaigns"."id" IS 'readonly';

COMMENT ON COLUMN "donation_campaigns"."description" IS 'display as textarea';

COMMENT ON COLUMN "donation_campaigns"."status" IS 'display as dropdown';

COMMENT ON COLUMN "donation_campaigns"."created_at" IS 'readonly';

COMMENT ON COLUMN "donations"."id" IS 'readonly';

COMMENT ON COLUMN "donations"."created_at" IS 'readonly';

COMMENT ON COLUMN "merchandise_waitlists"."id" IS 'readonly';

COMMENT ON COLUMN "merchandise_waitlists"."status" IS 'display as dropdown';

COMMENT ON COLUMN "merchandise_waitlists"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_reviews"."id" IS 'readonly';

COMMENT ON COLUMN "user_reviews"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_reviews"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_reviews"."id" IS 'readonly';

COMMENT ON COLUMN "player_reviews"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_reviews"."updated_at" IS 'readonly';

COMMENT ON COLUMN "user_favorites"."id" IS 'readonly';

COMMENT ON COLUMN "search_history"."id" IS 'readonly';

COMMENT ON COLUMN "user_social_posts"."id" IS 'readonly';

COMMENT ON COLUMN "user_social_posts"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_social_posts"."updated_at" IS 'readonly';

COMMENT ON COLUMN "social_post_comments"."id" IS 'readonly';

COMMENT ON COLUMN "social_post_comments"."created_at" IS 'readonly';

COMMENT ON COLUMN "social_post_comments"."updated_at" IS 'readonly';

COMMENT ON COLUMN "social_post_likes"."id" IS 'readonly';

COMMENT ON COLUMN "social_post_likes"."created_at" IS 'readonly';

COMMENT ON COLUMN "merchandise_reviews"."id" IS 'readonly';

COMMENT ON COLUMN "merchandise_reviews"."created_at" IS 'readonly';

COMMENT ON COLUMN "merchandise_reviews"."updated_at" IS 'readonly';

COMMENT ON COLUMN "fan_clubs"."id" IS 'readonly';

COMMENT ON COLUMN "fan_clubs"."description" IS 'display as textarea';

COMMENT ON COLUMN "fan_clubs"."logo_url" IS 'display as url/image input';

COMMENT ON COLUMN "fan_clubs"."status" IS 'display as dropdown';

COMMENT ON COLUMN "fan_clubs"."created_at" IS 'readonly';

COMMENT ON COLUMN "fan_club_memberships"."id" IS 'readonly';

COMMENT ON COLUMN "fan_club_memberships"."status" IS 'display as dropdown';

COMMENT ON COLUMN "fan_club_memberships"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_notification_preferences"."id" IS 'readonly';

COMMENT ON COLUMN "user_notification_preferences"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_notification_preferences"."updated_at" IS 'readonly';

COMMENT ON COLUMN "venue_accessibility"."id" IS 'readonly';

COMMENT ON COLUMN "venue_accessibility"."notes" IS 'display as textarea';

COMMENT ON COLUMN "venue_accessibility"."updated_at" IS 'readonly';

COMMENT ON COLUMN "player_medical_records"."id" IS 'readonly';

COMMENT ON COLUMN "player_medical_records"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_medical_records"."updated_at" IS 'readonly';

COMMENT ON COLUMN "doping_tests"."id" IS 'readonly';

COMMENT ON COLUMN "doping_tests"."notes" IS 'display as textarea';

COMMENT ON COLUMN "doping_tests"."created_at" IS 'readonly';

COMMENT ON COLUMN "background_checks"."id" IS 'readonly';

COMMENT ON COLUMN "background_checks"."notes" IS 'display as textarea';

COMMENT ON COLUMN "background_checks"."created_at" IS 'readonly';

COMMENT ON COLUMN "video_highlights"."id" IS 'readonly';

COMMENT ON COLUMN "video_highlights"."description" IS 'display as textarea';

COMMENT ON COLUMN "video_highlights"."video_url" IS 'display as url/image input';

COMMENT ON COLUMN "video_highlights"."thumbnail_url" IS 'display as url/image input';

COMMENT ON COLUMN "video_highlights"."created_at" IS 'readonly';

COMMENT ON COLUMN "streaming_events"."id" IS 'readonly';

COMMENT ON COLUMN "streaming_events"."description" IS 'display as textarea';

COMMENT ON COLUMN "streaming_events"."stream_url" IS 'display as url/image input';

COMMENT ON COLUMN "streaming_events"."status" IS 'display as dropdown';

COMMENT ON COLUMN "streaming_events"."created_at" IS 'readonly';

COMMENT ON COLUMN "content_moderation"."id" IS 'readonly';

COMMENT ON COLUMN "content_moderation"."moderation_notes" IS 'display as textarea';

COMMENT ON COLUMN "content_moderation"."created_at" IS 'readonly';

COMMENT ON COLUMN "practice_drills"."id" IS 'readonly';

COMMENT ON COLUMN "practice_drills"."description" IS 'display as textarea';

COMMENT ON COLUMN "practice_drills"."created_at" IS 'readonly';

COMMENT ON COLUMN "practice_drills"."updated_at" IS 'readonly';

COMMENT ON COLUMN "practice_drill_templates"."id" IS 'readonly';

COMMENT ON COLUMN "practice_drill_templates"."notes" IS 'display as textarea';

COMMENT ON COLUMN "practice_drill_templates"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_equipment_inventory"."id" IS 'readonly';

COMMENT ON COLUMN "team_equipment_inventory"."notes" IS 'display as textarea';

COMMENT ON COLUMN "team_equipment_inventory"."updated_at" IS 'readonly';

COMMENT ON COLUMN "team_communication_channels"."id" IS 'readonly';

COMMENT ON COLUMN "team_communication_channels"."channel_type" IS 'display as dropdown';

COMMENT ON COLUMN "team_communication_channels"."description" IS 'display as textarea';

COMMENT ON COLUMN "team_communication_channels"."status" IS 'display as dropdown';

COMMENT ON COLUMN "team_communication_channels"."created_at" IS 'readonly';

COMMENT ON COLUMN "team_messages"."id" IS 'readonly';

COMMENT ON COLUMN "team_messages"."created_at" IS 'readonly';

COMMENT ON COLUMN "user_direct_messages"."id" IS 'readonly';

COMMENT ON COLUMN "user_direct_messages"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_comparisons"."id" IS 'readonly';

COMMENT ON COLUMN "player_comparisons"."description" IS 'display as textarea';

COMMENT ON COLUMN "player_comparisons"."created_at" IS 'readonly';

COMMENT ON COLUMN "player_comparison_results"."id" IS 'readonly';

COMMENT ON COLUMN "player_comparison_results"."created_at" IS 'readonly';

COMMENT ON COLUMN "predictive_analytics_models"."id" IS 'readonly';

COMMENT ON COLUMN "predictive_analytics_models"."description" IS 'display as textarea';

COMMENT ON COLUMN "predictive_analytics_models"."status" IS 'display as dropdown';

COMMENT ON COLUMN "predictive_analytics_models"."created_at" IS 'readonly';

COMMENT ON COLUMN "predictive_analytics_models"."updated_at" IS 'readonly';

COMMENT ON COLUMN "predictive_analytics_results"."id" IS 'readonly';

COMMENT ON COLUMN "calendar_events"."id" IS 'readonly';

COMMENT ON COLUMN "calendar_events"."description" IS 'display as textarea';

COMMENT ON COLUMN "calendar_events"."status" IS 'display as dropdown';

COMMENT ON COLUMN "calendar_events"."created_at" IS 'readonly';

COMMENT ON COLUMN "calendar_events"."updated_at" IS 'readonly';

COMMENT ON COLUMN "calendar_attendees"."id" IS 'readonly';

COMMENT ON COLUMN "calendar_attendees"."created_at" IS 'readonly';

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "persons" ADD FOREIGN KEY ("nationality_id") REFERENCES "nationalities" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "leagues" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "seasons" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "divisions" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "teams" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "teams" ADD FOREIGN KEY ("division_id") REFERENCES "divisions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "management" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "management" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "management" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "players" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "players" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "rosters" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "rosters" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "rosters" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "lineups" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "lineups" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "lineups" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "injuries" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "suspensions" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "free_agency" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "free_agency" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_equipment" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contracts" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contracts" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trades" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trades" ADD FOREIGN KEY ("from_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trades" ADD FOREIGN KEY ("to_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "draft" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "draft" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "draft" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games" ADD FOREIGN KEY ("home_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games" ADD FOREIGN KEY ("away_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games" ADD FOREIGN KEY ("venue_id") REFERENCES "venues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_setup" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_settings" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_events" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_events" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_events" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_events" ADD FOREIGN KEY ("assist_player_1_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_events" ADD FOREIGN KEY ("assist_player_2_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_summaries" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_summaries" ADD FOREIGN KEY ("game_mvp_player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "live_game_scoring" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_stats" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_stats" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "standings" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "standings" ADD FOREIGN KEY ("division_id") REFERENCES "divisions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "standings" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practices" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practice_attendance" ADD FOREIGN KEY ("practice_id") REFERENCES "practices" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practice_attendance" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "officials" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_officials" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_officials" ADD FOREIGN KEY ("official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tournament_participants" ADD FOREIGN KEY ("tournament_id") REFERENCES "tournaments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tournament_participants" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "achievements" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "awards" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "awards" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "awards" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "social_media" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "media" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "media" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "media" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "documents" ADD FOREIGN KEY ("uploaded_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "document_access_logs" ADD FOREIGN KEY ("document_id") REFERENCES "documents" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "document_access_logs" ADD FOREIGN KEY ("accessed_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "event_rsvp" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "event_rsvp" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "brands" ADD FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_sponsors" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_sponsors" ADD FOREIGN KEY ("sponsor_id") REFERENCES "sponsors" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "admin_settings" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "admin_settings" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "system_setup_wizard" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "system_setup_wizard" ADD FOREIGN KEY ("completed_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scorekeeper_setup" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scorekeeper_setup" ADD FOREIGN KEY ("home_scorekeeper_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scorekeeper_setup" ADD FOREIGN KEY ("away_scorekeeper_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scorekeeper_setup" ADD FOREIGN KEY ("home_timekeeper_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scorekeeper_setup" ADD FOREIGN KEY ("away_timekeeper_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scorekeeper_settings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "league_manager_options" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "league_manager_options" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_manager_options" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_manager_options" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "personalisation" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_friends" ADD FOREIGN KEY ("user_id_1") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_friends" ADD FOREIGN KEY ("user_id_2") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_followers" ADD FOREIGN KEY ("follower_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_followers" ADD FOREIGN KEY ("followed_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tasks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "advertisements" ADD FOREIGN KEY ("campaign_id") REFERENCES "marketing_campaigns" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "advertisements" ADD FOREIGN KEY ("sponsor_id") REFERENCES "sponsors" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "equipment_marketplace" ADD FOREIGN KEY ("seller_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "equipment_marketplace" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_storefronts" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "storefront_products" ADD FOREIGN KEY ("storefront_id") REFERENCES "team_storefronts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "storefront_orders" ADD FOREIGN KEY ("storefront_id") REFERENCES "team_storefronts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "storefront_orders" ADD FOREIGN KEY ("customer_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "storefront_orders" ADD FOREIGN KEY ("shipment_id") REFERENCES "shipments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "storefront_order_items" ADD FOREIGN KEY ("order_id") REFERENCES "storefront_orders" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "storefront_order_items" ADD FOREIGN KEY ("product_id") REFERENCES "storefront_products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "equipment_marketplace_transactions" ADD FOREIGN KEY ("listing_id") REFERENCES "equipment_marketplace" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "equipment_marketplace_transactions" ADD FOREIGN KEY ("buyer_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "equipment_marketplace_transactions" ADD FOREIGN KEY ("seller_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "equipment_marketplace_transactions" ADD FOREIGN KEY ("shipment_id") REFERENCES "shipments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "shipments" ADD FOREIGN KEY ("transaction_id") REFERENCES "equipment_marketplace_transactions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "shipments" ADD FOREIGN KEY ("origin_warehouse_id") REFERENCES "warehouses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "delivery_tracking" ADD FOREIGN KEY ("shipment_id") REFERENCES "shipments" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventory_stock" ADD FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventory_stock" ADD FOREIGN KEY ("equipment_id") REFERENCES "equipment_marketplace" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "inventory_stock" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "loan_contracts" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "loan_contracts" ADD FOREIGN KEY ("from_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "loan_contracts" ADD FOREIGN KEY ("to_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "all_star_competitions" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "all_star_selection" ADD FOREIGN KEY ("competition_id") REFERENCES "all_star_competitions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "all_star_selection" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "all_star_selection" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "all_star_games" ADD FOREIGN KEY ("competition_id") REFERENCES "all_star_competitions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "all_star_games" ADD FOREIGN KEY ("mvp_player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "goal_songs" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "goal_songs" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "accolades" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "rink_dimensions" ADD FOREIGN KEY ("venue_id") REFERENCES "venues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "ice_conditions" ADD FOREIGN KEY ("venue_id") REFERENCES "venues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "venue_locker_rooms" ADD FOREIGN KEY ("venue_id") REFERENCES "venues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "venue_locker_rooms" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "farm_teams" ADD FOREIGN KEY ("parent_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "farm_teams" ADD FOREIGN KEY ("farm_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "salary_caps" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "salary_caps" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_colors" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "polls" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "poll_options" ADD FOREIGN KEY ("poll_id") REFERENCES "polls" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "poll_responses" ADD FOREIGN KEY ("poll_id") REFERENCES "polls" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "poll_responses" ADD FOREIGN KEY ("poll_option_id") REFERENCES "poll_options" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "poll_responses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "registration_submissions" ADD FOREIGN KEY ("form_id") REFERENCES "registration_forms" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "registration_submissions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "registration_submissions" ADD FOREIGN KEY ("reviewed_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "personal_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "personal_profiles" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_public_profiles" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_privacy_settings" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_privacy_settings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_persons" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_persons" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_permissions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "goaltender_stats" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "goaltender_stats" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_ratings" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_ratings" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_reputation_scores" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_rankings" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_rankings" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_stats" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_stats" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payroll_detail" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payroll_detail" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payroll_detail" ADD FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payroll_detail" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_bonuses" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_bonuses" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_bonuses" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_bonuses" ADD FOREIGN KEY ("related_contract_id") REFERENCES "contracts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_bonuses" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_bonuses" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "salary_cap_usage" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "salary_cap_usage" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "period_scoring" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_weather" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "audit_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contract_history" ADD FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contract_history" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contract_history" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contract_history" ADD FOREIGN KEY ("changed_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trade_history" ADD FOREIGN KEY ("trade_id") REFERENCES "trades" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trade_history" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trade_history" ADD FOREIGN KEY ("from_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trade_history" ADD FOREIGN KEY ("to_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "transaction_history" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "transaction_history" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_brackets" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_series" ADD FOREIGN KEY ("bracket_id") REFERENCES "playoff_brackets" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_series" ADD FOREIGN KEY ("team_1_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_series" ADD FOREIGN KEY ("team_2_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_advancement" ADD FOREIGN KEY ("bracket_id") REFERENCES "playoff_brackets" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_advancement" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "playoff_advancement" ADD FOREIGN KEY ("eliminated_by_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_stats" ADD FOREIGN KEY ("official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_stats" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "disciplinary_log" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "disciplinary_log" ADD FOREIGN KEY ("issued_by_official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_fines" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_warnings" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_warnings" ADD FOREIGN KEY ("issued_by_official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "coaches" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "coach_assignments" ADD FOREIGN KEY ("coach_id") REFERENCES "coaches" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "coach_assignments" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "coach_assignments" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trainers" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trainer_assignments" ADD FOREIGN KEY ("trainer_id") REFERENCES "trainers" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trainer_assignments" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trainer_assignments" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scouts" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "scouts" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "waiver_wire" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "waiver_wire" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "waiver_wire" ADD FOREIGN KEY ("released_by_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "waiver_claims" ADD FOREIGN KEY ("waiver_id") REFERENCES "waiver_wire" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "waiver_claims" ADD FOREIGN KEY ("claiming_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trade_windows" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "trade_windows" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "broadcast_rights" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "broadcast_rights" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "league_rules" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "promotion_relegation_rules" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "promotion_relegation_rules" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "promotion_relegation_history" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "promotion_relegation_history" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "promotion_relegation_history" ADD FOREIGN KEY ("from_division_id") REFERENCES "divisions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "promotion_relegation_history" ADD FOREIGN KEY ("to_division_id") REFERENCES "divisions" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "club_manager_options" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "club_manager_options" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tickets" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tickets" ADD FOREIGN KEY ("section_id") REFERENCES "seating_sections" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "tickets" ADD FOREIGN KEY ("purchased_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "seating_sections" ADD FOREIGN KEY ("venue_id") REFERENCES "venues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "seat_inventory" ADD FOREIGN KEY ("section_id") REFERENCES "seating_sections" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "seat_inventory" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "news" ADD FOREIGN KEY ("author_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "news" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "news" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "news" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "news_comments" ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "news_comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_engagement" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_engagement" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_engagement" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_engagement" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_financials" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_financials" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "financial_transactions" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "financial_transactions" ADD FOREIGN KEY ("recorded_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "financial_reports" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "financial_reports" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "financial_reports" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpools" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpools" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpools" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpools" ADD FOREIGN KEY ("vehicle_id") REFERENCES "carpool_vehicles" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpool_participants" ADD FOREIGN KEY ("carpool_id") REFERENCES "carpools" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpool_participants" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carpool_vehicles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_development_plans" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_development_plans" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_development_plans" ADD FOREIGN KEY ("coach_id") REFERENCES "coaches" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "skill_assessments" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "skill_assessments" ADD FOREIGN KEY ("assessor_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_milestones" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_milestones" ADD FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_milestones" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_milestones" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "league_milestones" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "league_milestones" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_progression_history" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_progression_history" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_assignments" ADD FOREIGN KEY ("official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_assignments" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_assignments" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_performance_feedback" ADD FOREIGN KEY ("official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_performance_feedback" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_performance_feedback" ADD FOREIGN KEY ("feedback_provider_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "official_certification_renewals" ADD FOREIGN KEY ("official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "salary_cap_penalties" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "salary_cap_penalties" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "revenue_sharing_agreements" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "revenue_sharing_agreements" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "luxury_tax_calculations" ADD FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "luxury_tax_calculations" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "luxury_tax_calculations" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_camps" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_camps" ADD FOREIGN KEY ("director_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_camp_registrations" ADD FOREIGN KEY ("camp_id") REFERENCES "development_camps" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_camp_registrations" ADD FOREIGN KEY ("participant_person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_squad_rosters" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_squad_rosters" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "development_squad_rosters" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_development_reports" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_development_reports" ADD FOREIGN KEY ("coach_id") REFERENCES "coaches" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_timeouts" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "game_timeouts" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "challenge_reviews" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "challenge_reviews" ADD FOREIGN KEY ("challenging_team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "challenge_reviews" ADD FOREIGN KEY ("official_id") REFERENCES "officials" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "play_by_play_log" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "play_by_play_log" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "play_by_play_log" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "shot_charts" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "shot_charts" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "shot_charts" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "return_to_play_stages" ADD FOREIGN KEY ("protocol_id") REFERENCES "return_to_play_protocols" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "clearance_sign_offs" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "clearance_sign_offs" ADD FOREIGN KEY ("protocol_id") REFERENCES "return_to_play_protocols" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "clearance_sign_offs" ADD FOREIGN KEY ("medical_staff_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "injury_prevention_programs" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "injury_prevention_programs" ADD FOREIGN KEY ("coordinator_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "sponsorship_deliverables" ADD FOREIGN KEY ("sponsorship_id") REFERENCES "team_sponsors" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "partnership_performance_metrics" ADD FOREIGN KEY ("sponsorship_id") REFERENCES "team_sponsors" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "partnership_disputes" ADD FOREIGN KEY ("sponsorship_id") REFERENCES "team_sponsors" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "premium_memberships" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "premium_memberships" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "donation_campaigns" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "donation_campaigns" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "donations" ADD FOREIGN KEY ("campaign_id") REFERENCES "donation_campaigns" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "donations" ADD FOREIGN KEY ("donor_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "merchandise_waitlists" ADD FOREIGN KEY ("product_id") REFERENCES "storefront_products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "merchandise_waitlists" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_reviews" ADD FOREIGN KEY ("reviewer_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_reviews" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_reviews" ADD FOREIGN KEY ("reviewer_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "search_history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_social_posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_social_posts" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_social_posts" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_social_posts" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "social_post_comments" ADD FOREIGN KEY ("post_id") REFERENCES "user_social_posts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "social_post_comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "social_post_likes" ADD FOREIGN KEY ("post_id") REFERENCES "user_social_posts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "social_post_likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "merchandise_reviews" ADD FOREIGN KEY ("product_id") REFERENCES "storefront_products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "merchandise_reviews" ADD FOREIGN KEY ("reviewer_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_clubs" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_clubs" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_clubs" ADD FOREIGN KEY ("founder_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_club_memberships" ADD FOREIGN KEY ("fan_club_id") REFERENCES "fan_clubs" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "fan_club_memberships" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_notification_preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "venue_accessibility" ADD FOREIGN KEY ("venue_id") REFERENCES "venues" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_medical_records" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "doping_tests" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "background_checks" ADD FOREIGN KEY ("person_id") REFERENCES "persons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "video_highlights" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "video_highlights" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "video_highlights" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "video_highlights" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "streaming_events" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "streaming_events" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "streaming_events" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "content_moderation" ADD FOREIGN KEY ("flagged_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "content_moderation" ADD FOREIGN KEY ("reviewed_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practice_drills" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practice_drills" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practice_drill_templates" ADD FOREIGN KEY ("drill_id") REFERENCES "practice_drills" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "practice_drill_templates" ADD FOREIGN KEY ("practice_id") REFERENCES "practices" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_equipment_inventory" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_communication_channels" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_communication_channels" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_messages" ADD FOREIGN KEY ("channel_id") REFERENCES "team_communication_channels" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "team_messages" ADD FOREIGN KEY ("sender_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_direct_messages" ADD FOREIGN KEY ("sender_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "user_direct_messages" ADD FOREIGN KEY ("recipient_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_comparisons" ADD FOREIGN KEY ("primary_player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_comparisons" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_comparisons" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_comparison_results" ADD FOREIGN KEY ("comparison_id") REFERENCES "player_comparisons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "player_comparison_results" ADD FOREIGN KEY ("compared_player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "predictive_analytics_models" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "predictive_analytics_results" ADD FOREIGN KEY ("model_id") REFERENCES "predictive_analytics_models" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "predictive_analytics_results" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "predictive_analytics_results" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "predictive_analytics_results" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_events" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_events" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_events" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_events" ADD FOREIGN KEY ("practice_id") REFERENCES "practices" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_events" ADD FOREIGN KEY ("generic_event_id") REFERENCES "events" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_attendees" ADD FOREIGN KEY ("calendar_event_id") REFERENCES "calendar_events" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "calendar_attendees" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
