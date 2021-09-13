export enum Step {
    Travel = 1,
    World = 2,
    Battle = 3,
    PostBattle = 4    
}

export enum SubStep {
    FleeInvasion,
    DecideToTravel,
    NewWorldArrival, 
    UpkeepRepairs,
    AssignCrewTasksFindPatron,
    AssignCrewTasksTrain,
    AssignCrewTasksTrade,
    AssignCrewTasksRecruit,
    AssignCrewTasksExplore,
    AssignCrewTasksTrack,
    AssignCrewTasksRepair,
    AssignCrewTasksDecoy,
    JobOffers,
    AssignEquipment,
    ResolveRumors,
    ChooseBattle,
    //Post-Battle
    ResolveRivalStatus,
    ResolvePatronStatus,
    DetermineQuestProgress,
    GetPaid,
    BattlefieldFinds,
    CheckForInvasion,
    GatherTheLoot,
    DetermineInjuriesAndRecovery,
    ExperienceAndUpgrades,
    AdvancedTraining,
    PurchaseItems,
    CampaignEvent,
    CharacterEvent,
    GalacticWarProgress
}
