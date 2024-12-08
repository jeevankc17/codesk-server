-- CreateTable
CREATE TABLE "Hackathon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "themes" TEXT[],
    "approxParticipants" INTEGER NOT NULL,
    "minTeamSize" INTEGER NOT NULL,
    "maxTeamSize" INTEGER NOT NULL,
    "venue" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "applicationOpen" TIMESTAMP(3) NOT NULL,
    "applicationClose" TIMESTAMP(3) NOT NULL,
    "rsvpWithin" INTEGER NOT NULL,
    "hackathonBegins" TIMESTAMP(3) NOT NULL,
    "submissionDeadline" TIMESTAMP(3) NOT NULL,
    "selectedFields" TEXT[],
    "websiteUrl" TEXT,
    "codeskUrl" TEXT,
    "contactEmail" TEXT NOT NULL,
    "codeOfConductUrl" TEXT,
    "useCodeOfConductUrl" BOOLEAN NOT NULL DEFAULT false,
    "twitter" TEXT,
    "linkedin" TEXT,
    "discord" TEXT,
    "slack" TEXT,
    "hashnode" TEXT,
    "telegram" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "brandColor" TEXT NOT NULL,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "coverImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizerId" TEXT NOT NULL,

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Builder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tShirtSize" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "skills" TEXT[],
    "experience" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "portfolioUrl" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "interests" TEXT[],
    "dietaryRestrictions" TEXT,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactRelation" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Builder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "challenges" TEXT NOT NULL,
    "technologies" TEXT[],
    "links" TEXT[],
    "videoDemo" TEXT,
    "coverImageUrl" TEXT,
    "pictureUrls" TEXT[],
    "logoUrl" TEXT,
    "platforms" TEXT[],
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectBuilder" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "builderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectBuilder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "logoUrl" TEXT,
    "establishedYear" INTEGER NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "previousHackathons" INTEGER NOT NULL,
    "requiredSkills" TEXT[],
    "linkedin" TEXT,
    "twitter" TEXT,
    "github" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "website" TEXT,
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prizes" JSONB NOT NULL,
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT,
    "designation" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT,
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "hackathonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Builder_email_key" ON "Builder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectBuilder_projectId_builderId_key" ON "ProjectBuilder"("projectId", "builderId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- AddForeignKey
ALTER TABLE "Hackathon" ADD CONSTRAINT "Hackathon_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBuilder" ADD CONSTRAINT "ProjectBuilder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBuilder" ADD CONSTRAINT "ProjectBuilder_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "Builder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEvent" ADD CONSTRAINT "ScheduleEvent_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
