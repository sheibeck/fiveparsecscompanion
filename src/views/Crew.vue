<template>
  <div v-if="crew">    
    <div class="d-md-flex justify">
      <!-- crew log -->      
      <div class="d-flex flex-column flex-fill m-1 border border-2 p-1">
        <h4 class="p-1 rounded d-print-none border">Crew Log</h4>
        <div class="d-flex">
          <div class="d-flex flex-fill me-auto">
            <label for="crewName" class="form-text small">Crew Name</label>
            <input v-model="crew.name" type="text" class="form-control" :class="{ 'd-none': !editing }" id="crewName" placeholder="Crew Name" />
            <span :class="{ 'd-none': editing }">: {{crew.name}}</span>
          </div> 
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewStoryPoints" class="form-text small">Story Point</label>
            <input v-model.number="crew.story_points" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewStoryPoints" placeholder="0" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.story_points}}</span>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex me-auto flex-shrink-1">
            <label for="campaignTurn" class="form-text small">Turn</label>
            <input v-model.number="crew.campaign_turn" type="number" class="form-control" :class="{ 'd-none': !editing }" id="campaignTurn" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.campaign_turn}}</span>
          </div>
          <div class="d-flex me-auto">
            <label for="campaignDifficulty" class="form-text small">Difficulty</label>
            <input v-model="crew.campaign_difficulty" type="text" class="form-control" :class="{ 'd-none': !editing }" id="campaignDifficulty" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.campaign_difficulty}}</span>
          </div>
          <div class="d-flex w-50 me-auto">
            <label for="campaignVictory" class="form-text small">Victory</label>
            <input v-model="crew.campaign_victory" type="text" class="form-control" :class="{ 'd-none': !editing }" id="campaignVictory" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.campaign_victory}}</span>
          </div>
        </div>
        <div class="d-flex">
          <div class="flex-column flex-fill">
            <label for="crewNotes" class="form-text small">Notes</label>
            <textarea v-model="crew.notes" class="form-control" :class="{ 'd-none': !editing }" id="crewNotes" placeholder=""></textarea>
            <span :class="{ 'd-none': editing }">: {{crew.notes}}</span>
          </div>
        </div>
        
      </div>

      <!-- stash -->
      <div class="d-flex flex-column flex-fill m-1  border border-2 p-1">        
          <h4 class="p-1 rounded d-print-none">Stash</h4>
          <div class="d-flex">
            <div class="d-flex flex-fill flex-column w-100">
              <label for="crewStash" class="form-text small">Stash</label>
              <textarea v-model.number="crew.stash" class="form-control" :class="{ 'd-none': !editing }" id="crewStash" placeholder="" rows="7"></textarea>
              <span :class="{ 'd-none': editing }">{{crew.stash}}</span>       
            </div>
          
            <div class="d-flex flex-column flex-shrink-1">
              <div class="d-flex flex-column  text-center">
                <label for="crewCredits" class="form-text small">Credits</label>
                <input v-model.number="crew.credits" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewCredits" placeholder="0" />
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.credits}}</span>      
              </div> 
              <div class="d-flex flex-column text-center">
                <label for="crewPatrons" class="form-text small">Patrons</label>
                <input v-model.number="crew.patrons" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewPatrons" placeholder="0" />
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.patrons}}</span>
              </div>
              <div class="d-flex flex-column text-center">
                <label for="crewRivals" class="form-text small">Rivals</label>
                <input v-model.number="crew.rivals" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewRivals" placeholder="0" />
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.rivals}}</span>
              </div>
            </div>
          </div>  
        
      </div>

      <!-- ship details -->          
      <div class="d-flex flex-column flex-fill m-1 border border-2 p-1">      
        <h4 class="p-1 rounded d-print-none">Ship Details</h4>
        <div class="d-flex">
          <div class="d-flex flex-fill me-auto">
            <label for="shipName" class="form-text small">Ship Name</label>
            <input v-model="crew.ship_name" type="text" class="form-control" :class="{ 'd-none': !editing }"  id="shipName" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.ship_name}}</span>
          </div> 
          <div class="d-flex flex-nowrap flex-shrink-1 me-auto">
            <label for="shipHull" class="form-text small">Hull</label>
            <input v-model.number="crew.ship_hull_points" type="number" class="form-control" :class="{ 'd-none': !editing }" id="shipHull" placeholder="0" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.ship_hull_points}}</span>
          </div>
          <div class="d-flex flex-nowrap flex-shrink-1 me-auto">
            <label for="shipDebt" class="form-text small">Debt</label>
            <input v-model.number="crew.ship_debt" type="number" class="form-control" :class="{ 'd-none': !editing }" id="shipDebt" placeholder="0" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.ship_debt}}</span>
          </div>
        </div>

        <div class="d-flex h-100">
          <div class="d-flex w-100 me-auto">
            <label for="shipTraits" class="form-text small">Traits</label>
            <textarea v-model="crew.ship_traits" class="form-control" id="shipTraits" :class="{ 'd-none': !editing }" placeholder=""></textarea>
            <span :class="{ 'd-none': editing }">: {{crew.ship_traits}}</span>
          </div>
          <div class="d-flex w-100 me-auto">
            <label for="shipUpgrades" class="form-text small">Upgrades</label>
            <textarea v-model="crew.ship_upgrades" class="form-control" id="shipUpgrades" :class="{ 'd-none': !editing }" placeholder=""></textarea>
            <span :class="{ 'd-none': editing }">: {{crew.ship_upgrades}}</span>
          </div>
        </div>
      
        <div class="d-flex">
          <div class="d-flex me-auto flex-fill">
            <label for="crewStoryTrack" class="form-text small">Story Track</label>
            <input v-model="crew.story_track" type="text" class="form-control" id="crewStoryTrack" :class="{ 'd-none': !editing }" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.story_track}}</span>
          </div>
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewEvent" class="form-text small">Event</label>
            <input v-model.number="crew.event" type="number" class="form-control" id="crewEvent" :class="{ 'd-none': !editing }" placeholder="" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.event}}</span>
          </div>
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewClock" class="form-text small">Clock</label>
            <input v-model.number="crew.clock" type="number" class="form-control" id="crewClock" :class="{ 'd-none': !editing }" placeholder="" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.clock}}</span>
          </div>
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewRumors" class="form-text small">Rumors</label>
            <input v-model.number="crew.quest_rumors" type="number" class="form-control" id="crewClock" :class="{ 'd-none': !editing }" placeholder="" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.quest_rumors}}</span>
          </div>
        </div>
        
      </div>
    </div>

    <div class="row mt-1  d-print-none">
      <div class="d-flex">
        <button v-if="editing" type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrew()">Save Crew Log <i class="fas fa-save"></i></button>        
        <button v-if="!editing" type="button" class="btn btn-primary btn-sm mx-1" @click="toggleEdit()">Edit Crew Log <i class="fas fa-pencil"></i></button>
        <button type="button" class="btn btn-secondary btn-sm mx-1" @click="print()">Print <i class="fas fa-print"></i></button>
        <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrew()">Delete Crew Log <i class="fas fa-trash"></i></button>
      </div>
    </div>

    <div class="row mt-2">
      <!-- crew members -->
      <div class="accordion" id="accordionMembers">
        <div class="accordion-item d-print-none">
          <h2 class="accordion-header d-flex" id="headingMembers">
            <button type="button" class="btn btn-primary btn-sm mx-1 d-print-none" @click="addCrewMember()">Add <i class="fas fa-plus"></i></button>
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMembers" aria-expanded="true" aria-controls="collapseMembers">
              Crew Members (Active members: {{crewMembers.filter( c => c.kia !== true ).length}})
            </button>            
          </h2>
        </div>
   
        <div id="collapseMembers" class="accordion-collapse collapse show" aria-labelledby="headingMembers" data-bs-parent="#accordionMembers">
          <div class="accordion-body d-flex flex-wrap p-1">          
            <div class="border border-1 p-1 col-12 col-md-6 print-keep-together d-flex flex-column my-1" :class="{ 'bg-dead': member.kia, 'bg-leader': member.leader, 'bg-sick': member.sick_bay }" v-for="member in crewMembers" :key="member.id">
              <div class="d-flex rounded h5 px-1 mb-0">
                {{member.name}}
                <div class="d-flex small ms-auto">
                  <div class="form-check">
                    <input :disabled="!isEditingCrew(member.id)" v-model="member.leader" class="form-check-input" type="checkbox" value="" />
                    <label class="form-check-label small" for="leader">
                      Leader
                    </label>
                  </div>
                  <div class="form-check ms-4">
                    <input :disabled="!isEditingCrew(member.id)" v-model="member.sick_bay" class="form-check-input" type="checkbox" value="" />
                    <label class="form-check-label small" for="sickbay">
                      Sick Bay
                    </label>
                  </div>
                  <div class="form-check ms-4">
                    <input :disabled="!isEditingCrew(member.id)" v-model="member.kia" class="form-check-input" type="checkbox" value="" />
                    <label class="form-check-label small" for="kia">
                      KIA
                    </label>
                  </div>               
                </div>
              </div>
              <div class="d-flex flex-wrap flex-md-nowrap">
                <!--name -->
                <div class="flex-fill">
                  <div class="d-flex flex-fill flex-wrap">
                    <div class="d-flex" :class="{ 'd-none': !isEditingCrew(member.id) }">
                      <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.name = rollOnTable('name')"></i>
                      <div class="form-text">Name</div>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.name}}</span>
                    </div>                        
                    <input :class="{ 'd-none': !isEditingCrew(member.id) }" v-model="member.name" type="text" class="form-control" placeholder="" />
                  
                    <div class="d-flex">
                      <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.species = rollOnTable('crewtype')"></i>
                      <div class="form-text">Species</div>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.species}}</span>
                    </div>                        
                    <input :class="{ 'd-none': !isEditingCrew(member.id) }" v-model="member.species" type="text" class="form-control" placeholder="" /> 
                  </div>

                  <div class="d-flex flex-column d-print-none">
                    <div class="">
                      <div class="d-flex">
                        <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.background = rollOnTable('background')"></i>
                        <div class="form-text">Background</div>
                        <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.background}}</span>
                      </div>                        
                      <input v-model="member.background" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                                                
                    </div>
                    <div class="">
                      <div class="">
                        <div class="d-flex">
                          <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.motivation = rollOnTable('motivation')"></i>
                          <div class="form-text">Motivation</div>
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.motivation}}</span>
                        </div>                      
                      </div>
                      <input v-model="member.motivation" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                            
                    </div>
                    <div class="">
                      <div class="">
                        <div class="d-flex">
                          <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.class = rollOnTable('class')"></i>
                          <div class="form-text">Class</div>
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.class}}</span>
                        </div>                     
                      </div>
                      <input v-model="member.class" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                            
                    </div>
                  </div>
                </div>

                <!-- attributes -->
                <div class="flex-wrap flex-shrink-1 attributes" :class="{ 'd-flex': !isEditingCrew(member.id) }">
                  <div class="text-center">                        
                    <div class="form-text">Reactions</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.reactions}}</span>
                    <input v-model.number="member.reactions" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                        
                  </div>
                  <div class="ms-1 text-center">                        
                    <div class="form-text">Speed</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }"> {{member.speed}}</span>                      
                    <input v-model.number="member.speed" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
                  </div>
                  <div class="ms-1 text-center">                        
                    <div class="form-text">Combat</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.combat}}</span>                        
                    <input v-model.number="member.combat" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                  </div>
                  <div class="ms-1 text-center">
                    <div class="form-text">Toughness</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.toughness}}</span>                      
                    <input v-model.number="member.toughness" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
                  </div>
                  <div class="ms-1 text-center">
                    <div class="form-text">Savvy</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.savvy}}</span>                        
                    <input v-model.number="member.savvy" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
                  </div>
                </div>
              </div>

              <div class="d-flex flex-wrap flex-md-nowrap flex-fill">
                <div class="d-flex w-auto align-items-start flex-column">  
                  <table class="table small mb-auto">
                    <thead>
                      <tr>
                        <th scope="" width="25%">
                          Weapon
                          <button type="button" :class="{ 'd-none': !isEditingCrew(member.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addWeaponToCrew(member.id)"><i class="fas fa-plus"></i></button>                              
                        </th>
                        <th scope="col" width="">Rng</th>
                        <th scope="col" width="">Shot</th>
                        <th scope="col" width="">Dam</th>
                        <th scope="col">Traits/Mods</th>
                        <th scope="col" width=""> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="weapon in member.weapons.weapons" :key="weapon.id">
                        <td th scope="row">
                          <input v-model="weapon.name" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.name}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.range" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.range}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.shots" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.shots}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.damage" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.damage}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.traits" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.traits}}</span>
                        </td>
                        <td>
                          <button type="button" :class="{ 'd-none': !isEditingCrew(member.id) }" class="btn btn-danger btn-sm d-print-none py-0 m-0" @click="removeWeaponFromCrew(weapon.id, member.id)"><i class="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>                 
                </div>
                
                <div class="d-flex flex-column w-auto me-auto">
                  <div class="h-50">
                    <div class="form-text">Gear/Gadgets</div>            
                    <p class="card-text">
                      <textarea v-model="member.gear" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{member.gear}}</span>
                    </p>
                  </div>
                  <div class="h-50">
                    <div class="form-text">Notes</div>
                    <p class="card-text">
                      <textarea v-model="member.notes" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{member.notes}}</span>
                    </p>
                  </div>
                </div>

                <div class="d-flex flex-column flex-shrink-1">
                  <div class="ms-1 text-center">                        
                    <div class="form-text">Luck</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.luck}}</span>                        
                    <input v-model.number="member.luck" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
                  </div>
                  <div class="ms-1 text-center">                        
                    <div class="form-text">XP</div>
                    <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.xp}}</span>                      
                    <input v-model.number="member.xp" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
                  </div>
                </div>
                
              </div>             
            
              <div class="d-flex d-print-none">
                <button v-if="isEditingCrew(member.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrewMember(member.id)">Save <i class="fas fa-save"></i></button>
                <button v-if="!isEditingCrew(member.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="toggleCrewEdit(member.id)">Edit <i class="fas fa-pen"></i></button>
                <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrewMember(member.id)">Delete <i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- worlds -->
      <div class="accordion" id="accordionWorlds">
        <div class="accordion-item d-print-none">
          <h2 class="accordion-header d-flex" id="headingWorlds">
            <button type="button" class="btn btn-primary btn-sm mx-1 d-print-none" @click="addWorld()">Add <i class="fas fa-plus"></i></button>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWorlds" aria-expanded="false" aria-controls="collapseWorlds">              
              Worlds (Tracked Worlds: {{worlds.length}})
            </button>
          </h2>          
        </div>
        <hr class="d-none d-print-block page-break-after" />
        <h5 class="d-none d-print-block worldrecordsheet mb-1 page-break-before">World Record Sheet</h5>
        <div id="collapseWorlds" class="accordion-collapse collapse p-1" aria-labelledby="headingWorlds" data-bs-parent="#accordionWorlds">
          <div class="accordion-body d-flex flex-wrap p-1">
            <div class="border border-1 p-1 col-12 col-md-6 d-flex flex-column print-keep-together my-1" :class="{ 'bg-leader': world.current_location }" v-for="world in worlds" :key="world.id">
              <div class="d-flex rounded h5 px-1 mb-0">
                {{world.name}}
                <div class="ms-4 small ms-auto">
                  <label class="form-check-label small p-0">
                    Current Location
                  </label>
                  <input :disabled="!isEditingWorld(world.id)" v-model="world.current_location" class="form-check-input" type="checkbox" value="" />                  
                </div>
              </div>
              <div class="d-flex">
                <div class="d-flex flex-column flex-md-row flex-fill">
                  <div class="d-flex flex-column">
                    <div class="" :class="{ 'd-none': !isEditingWorld(world.id) }">
                      <div class="form-text">Name</div>
                      <input v-model="world.name" type="text" class="form-control" placeholder="" />                                     
                    </div>                                      

                    <div class="form-check ms-4">
                      <input :disabled="!isEditingWorld(world.id)" v-model="world.licensing_required" class="form-check-input" type="checkbox" value="" />
                      <label class="form-check-label small" for="kia">
                        Licensing Required
                      </label>
                    </div>

                    <div class="form-check ms-4">
                      <input :disabled="!isEditingWorld(world.id) || !world.licensing_required" v-model="world.license_obtained" class="form-check-input" type="checkbox" value="" />
                      <label class="form-check-label small" for="kia">
                        License Obtained
                      </label>
                    </div>                  
                    
                  </div>

                  <div class="d-flex flex-fill border border-1 flex-fill">
                    <div class="flex-column flex-fill">
                      <label class="form-text small">Traits</label>
                      <textarea v-model="world.traits" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{world.traits}}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-fill border border-1 flex-fill">
                    <div class="flex-column flex-fill">
                      <label class="form-text small">Notes</label>
                      <textarea v-model="world.notes" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{world.notes}}</span>
                    </div>
                  </div>
                              
                </div>

                
                <div class="d-flex flex-column flex-fill border border-1">
                  <div class="flex-column flex-fill">
                    <label class="form-text small">Invading Force</label>
                    <textarea v-model="world.invading_forces" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                    <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{world.invading_forces}}</span>
                  </div>

                  <div class="flex-column flex-fill border border-1">
                    <label class="form-text small">War Progress</label>
                    <textarea v-model="world.war_progress" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                    <span :class="{ 'd-none': isEditingWorld(world.id) }">{{world.war_progress}}</span>
                  </div>
                </div>              
              </div>

              <div class="d-flex d-flex flex-fill">
                <div class="d-flex flex-column flex-fill">
                  <h6 class="p-1 rounded bg-light">Patrons Known ({{world.patrons_known.patrons.length}})
                    <button type="button" :class="{ 'd-none': !isEditingWorld(world.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addPatronToWorld(world.id)"><i class="fas fa-plus"></i></button>
                  </h6>
                  <div class="d-flex flex-column flex-fill border border-1" v-for="patron in world.patrons_known.patrons" :key="patron.id">                    
                    <div class="d-flex">
                      <div class="d-flex">
                        <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="patron.name = rollOnTable('name')"></i>
                        <div class="form-text">Name</div>
                        <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{patron.name}}</span>
                      </div>                        
                      <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="patron.name" type="text" class="form-control" placeholder="" />                                     
                    </div>    
                    <div class="d-flex">
                      <div class="d-flex">
                        <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="patron.type = rollOnTable('patron')"></i>
                        <div class="form-text">Type</div>
                        <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{patron.type}}</span>
                      </div>                        
                      <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="patron.type" type="text" class="form-control" placeholder="" />                                     
                    </div>    

                    <div class="d-flex flex-fill flex-column border border-1">
                      <label class="form-text small">Benefit</label>
                      <textarea v-model="patron.benefit" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingWorld(world.id) }">{{patron.benefit}}</span>
                    </div>
                  </div>              
                </div>

                <div class="d-flex flex-column flex-fill">
                  <h6 class="p-1 rounded bg-light">Rivals Known ({{world.rivals_known.rivals.length}})
                    <button type="button" :class="{ 'd-none': !isEditingWorld(world.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addRivalToWorld(world.id)"><i class="fas fa-plus"></i></button>
                  </h6>                  
                  <div class="d-flex flex-column flex-fill border border-1" v-for="rival in world.rivals_known.rivals" :key="rival.id">
                    <div class="d-flex">
                      <div class="d-flex">
                        <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="rival.name = rollOnTable('name')"></i>
                        <div class="form-text">Name</div>
                        <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{rival.name}}</span>
                      </div>                        
                      <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="rival.name" type="text" class="form-control" placeholder="" />                                     
                    </div>    
                    <div class="d-flex">
                      <div class="d-flex">
                        <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="rival.type = getRivalType()"></i>
                        <div class="form-text">Type</div>
                        <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{rival.type}}</span>
                      </div>                        
                      <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="rival.type" type="text" class="form-control" placeholder="" />                                     
                    </div>    

                    <div class="d-flex flex-column flex-fill border border-1">
                      <label class="form-text small">Notes</label>
                      <textarea v-model="rival.notes" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingWorld(world.id) }">{{rival.notes}}</span>
                    </div>
                  </div>              
                </div>
              </div>

              <div class="d-flex d-print-none">
                <button v-if="isEditingWorld(world.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="saveWorld(world.id)">Save <i class="fas fa-save"></i></button>
                <button v-if="!isEditingWorld(world.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="toggleWorldEdit(world.id)">Edit <i class="fas fa-pen"></i></button>
                <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeWorld(world.id)">Delete <i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</div>
   
</template>

<script>
import { DataStore } from '@aws-amplify/datastore';
import { Crew } from '../models';
import { CrewMember } from '../models';
import { World } from '../models';
import { FPFHTables } from '../js/tables.js';
import { Collapse } from 'bootstrap';

var shortid = require('shortid');

export default {
  name: 'Crew',  
  components: {    
  },
  mounted() {    
    this.fetchCrew();
  }, 
  data() {
    return {
      crew: null,      
      crewMembers: [],
      worlds: [],
      editing: false,
      crewEdit: [],
      worldEdit: [],
    }
  },  
  tables: new FPFHTables(),
  computed : {   
    crewId : function() {       
      return this.$route.params.id;
    },
    username: function() {
      return this.$store.state.user.username;
    }  
  },
  methods: {        
    isOwner: function(itemOwner) {
      return this.username === itemOwner;
    },
    toggleEdit: function() {
      this.editing = !this.editing;
    },
    toggleCrewEdit: function(crewId) {
      if (this.crewEdit.includes(crewId)) {
        this.crewEdit = this.crewEdit.filter(item => item !== crewId)
      } else {
        this.crewEdit.push(crewId);
      }
    },
    isEditingCrew: function(crewId) {
      return this.crewEdit.includes(crewId);
    },
    toggleWorldEdit: function(worldId) {
      if (this.worldEdit.includes(worldId)) {
        this.worldEdit = this.worldEdit.filter(item => item !== worldId)
      } else {
        this.worldEdit.push(worldId);
      }
    },
    isEditingWorld: function(worldId) {
      return this.worldEdit.includes(worldId);
    },
    rollOnTable: function(table) {
      if (table !== "name") {
        this.$root.showUserMsg(`Rolled on table ${table}`);
        return this.$options.tables.GetTableResult(table);
      } else {
        return this.$options.tables.RandomName(table);
      }
    },    
    async fetchCrew() {
      const crew = await DataStore.query(Crew, this.crewId);      
      this.crew = JSON.parse(JSON.stringify(crew));      

      this.fetchCrewMembers();
      this.fetchWorlds();      
    },

    async fetchCrewMembers() {
      const crewMembers = await DataStore.query(CrewMember, c => c.crewID("eq", this.crewId));      
      this.crewMembers = JSON.parse(JSON.stringify(crewMembers));
      //handle weapons
      for(var m = 0; m < this.crewMembers.length; m++) {
        this.crewMembers[m].weapons = JSON.parse(this.crewMembers[m].weapons);
      }      
    },

    async fetchWorlds() {
      const worlds = await DataStore.query(World, c => c.crewID("eq", this.crewId));      
      this.worlds = JSON.parse(JSON.stringify(worlds));
      //handle patrons and rivals
      for(var m = 0; m < this.worlds.length; m++) {
        this.worlds[m].patrons_known = JSON.parse(this.worlds[m].patrons_known);
        this.worlds[m].rivals_known = JSON.parse(this.worlds[m].rivals_known);
      }      
    },

    async saveCrew() {      
      let UPDATED_CREW = this.crew;
      const CURRENT_CREW = await DataStore.query(Crew, this.crewId);
      await DataStore.save(Crew.copyOf(CURRENT_CREW, item => {        
        //item.id = UPDATED_CREW.id,
        //item.user = UPDATED_CREW.user,
        item.name = UPDATED_CREW.name,
        item.notes =UPDATED_CREW.notes,
        item.story_points = UPDATED_CREW.story_points,
        item.stash = UPDATED_CREW.stash,
        item.credits = UPDATED_CREW.credits,
        item.patrons = UPDATED_CREW.patrons,
        item.rivals = UPDATED_CREW.rivals,
        item.ship_name = UPDATED_CREW.ship_name,
        item.ship_hull_points = UPDATED_CREW.ship_hull_points,
        item.ship_debt = UPDATED_CREW.ship_debt,
        item.ship_traits = UPDATED_CREW.ship_traits,
        item.ship_upgrades = UPDATED_CREW.ship_upgrades,
        item.story_track = UPDATED_CREW.story_track,
        item.event = UPDATED_CREW.event,
        item.clock = UPDATED_CREW.clock,
        item.quest_rumors = UPDATED_CREW.quest_rumors,
        item.CrewMembers = UPDATED_CREW.CrewMembers,
        item.Worlds = UPDATED_CREW.Worlds,
        item.campaign_turn = UPDATED_CREW.campaign_turn,
        item.campaign_difficulty = UPDATED_CREW.campaign_difficulty,
        item.campaign_victory = UPDATED_CREW.campaign_victory
        //item.createdAt = UPDATED_CREW.createdAt,
        //item.updatedAt = UPDATED_CREW.updatedAt
      }));

      this.$root.showUserMsg(`Crew log saved`);
      this.toggleEdit();
    },   

    async addCrewMember() {
      const restrictedBackgrounds = ["Peaceful, High-Tech Colony", "Wealthy Merchant Family", "Tech Guild", "Comfortable Megacity Class", "Bureaucrat"];
      const name = this.$options.tables.RandomName("name");
      const species = this.$options.tables.GetTableResult("crewtype");
      let background = this.$options.tables.GetTableResult("background");
      let motivation = this.$options.tables.GetTableResult("motivation");
      let crewClass = crewClass = this.$options.tables.GetTableResult("class");

      switch(species) 
      {
        case "Bot":
        case "Assault Bot":      
          background = "";
          motivation = "";
          crewClass = "";
        break;

        case "De-conerted":
          motivation = "Revenge";
          break;
          
        case "Unity Agent":
          motivation = "Order";
          break;

        case "Mysterious Past":
          background += `,${this.$options.tables.GetTableResult("background")}`;
          break;

        case "Hulker":
          switch(crewClass) {
            case "Technician":
            case "Scientist":
            case "Hacker":
              crewClass = "Primitive";
              break;
          }
          break;

        case "Genetic Uplift":
          while (restrictedBackgrounds.includes(background)) {
            background = this.$options.tables.GetTableResult("background");
          }
          break;

        case "Mutant":
          background = "Lower Megacity Class";
          break;

        case "Manipulator":
          background = "Bureaucrat";
          break;

        case "Primitive":
          background = "Primitive OR Regressed World";
          break;

        case "Feeler":
          motivation += `,${this.$options.tables.GetTableResult("motivation")}`;
          break;

        case "Emo-suppressed":
          motivation = "Survival";
          break;
      }
      
      await DataStore.save(
          new CrewMember({
          "user": this.username,
          "name": name,
          "species": species,
          "reactions": 0,
          "speed": 0,
          "combat": 0,
          "toughness": 0,
          "savvy": 0,
          "luck": 0,
          "gear": "",
          "notes": "",
          "weapons": "{\"weapons\":[]}",
          "xp": 0,
          "kia": false,
          "leader": false,
          "sick_bay": false,
          "background": background,
          "motivation": motivation,
          "class": crewClass,
          "crewID": this.crewId
        })
      );
      this.$root.showUserMsg(`Added ${name} to crew`);
      this.fetchCrewMembers();      
    },

    async addWeaponToCrew(id)
    {
      let modelWeapon = { "id": shortid.generate(), "name": "", "range": "", "shots": "0", "damage": "0", "traits": "" };
      let crewMember = this.crewMembers.find(m => m.id === id);
      crewMember.weapons.weapons.push(modelWeapon);
    },

    async removeWeaponFromCrew(id, crewId)
    {      
      if (!confirm("Are you sure you want to delete this weapon?")) return;
      let crewMember = this.crewMembers.find(m => m.id === crewId);
      crewMember.weapons.weapons = crewMember.weapons.weapons.filter( w => w.id !== id);

      this.$root.showUserMsg(`Removed weapon`);
    },

    async saveCrewMember(id) {
      let CURRENT_MEMBER = await DataStore.query(CrewMember, id);
      let UPDATED_MEMBER = this.crewMembers.find( m => m.id === id);
            
      await DataStore.save(CrewMember.copyOf(CURRENT_MEMBER, item => {        
        //item.id = UPDATED_MEMBER.id,
        //item.createdAt = UPDATED_MEMBER.createdAt,
        //item.updatedAt = UPDATED_MEMBER.updatedAt,
        //item.crewID = UPDATED_MEMBER.crewID,
        item.name = UPDATED_MEMBER.name,
        item.species = UPDATED_MEMBER.species,
        item.reactions = UPDATED_MEMBER.reactions,
        item.speed = UPDATED_MEMBER.speed,
        item.combat = UPDATED_MEMBER.combat,
        item.toughness = UPDATED_MEMBER.toughness,
        item.savvy = UPDATED_MEMBER.savvy,
        item.luck = UPDATED_MEMBER.luck,
        item.gear = UPDATED_MEMBER.gear,
        item.notes = UPDATED_MEMBER.notes,
        item.weapons = JSON.stringify(UPDATED_MEMBER.weapons),
        item.xp = UPDATED_MEMBER.xp,
        item.kia = UPDATED_MEMBER.kia,
        item.leader = UPDATED_MEMBER.leader,        
        item.background = UPDATED_MEMBER.background,
        item.motivation = UPDATED_MEMBER.motivation,
        item["class"] = UPDATED_MEMBER.class,
        item.sick_bay = UPDATED_MEMBER.sick_bay               
      }));      

      this.$root.showUserMsg(`Crew member ${UPDATED_MEMBER.name} saved`);
      this.toggleCrewEdit(id);
    },   

    async removeCrewMember(id) {
      if (!confirm("Are you sure you want to delete this crew member?")) return;

      const modelToDelete = await DataStore.query(CrewMember, id);
      DataStore.delete(modelToDelete);
      this.fetchCrewMembers();
      
      this.$root.showUserMsg(`Removed crew member`);
    },

    async removeCrew() {
      if (!confirm("Are you sure you want to delete the entire crew?")) return;

      const modelToDelete = await DataStore.query(Crew, this.crewId)
      await DataStore.delete(modelToDelete);
      
      this.$root.showUserMsg(`Removed crew`);

      this.$router.push('/');
    },

    async addWorld() {
      const name = this.$options.tables.RandomName("name");
      await DataStore.save(
          new World({
          "user": this.username,
          "name": name,        
          "crewID": this.crewId,
          "patrons_known":  "{\"patrons\":[]}",
          "rivals_known":  "{\"rivals\":[]}",
          "licensing_required": false,
          "license_obtained": false,
          "invading_forces": "",
          "war_progress": "",		
          "notes": "",
          "traits": "",
          "current_location": false,
        })
      );
      this.$root.showUserMsg(`Discovered planet ${name}`);
      this.fetchWorlds();   
    },

    async saveWorld(id) {
      let CURRENT = await DataStore.query(World, id);
      let UPDATED = this.worlds.find( w => w.id === id);
            
      await DataStore.save(CrewMember.copyOf(CURRENT, item => {    
          //item.id = UPDATED.id,
          //item.createdAt = UPDATED.createdAt,
          //item.updatedAt = UPDATED.updatedAt,
          //item.crewID = UPDATED.crewID,
          item.name = UPDATED.name,
          item.patrons_known = JSON.stringify(UPDATED.patrons_known),
          item.rivals_known = JSON.stringify(UPDATED.rivals_known),         
          item.license_obtained = UPDATED.license_obtained,
          item.licensing_required = UPDATED.licensing_required,
          item.invading_forces = UPDATED.invading_forces,
          item.war_progress = UPDATED.war_progress,
          item.traits = UPDATED.traits,
          item.notes = UPDATED.notes,
          item.current_location = UPDATED.current_location
        }));      

      this.$root.showUserMsg(`World ${UPDATED.name} saved`);
      this.toggleWorldEdit(id);
    },

    async removeWorld(id) {
      if (!confirm("Are you sure you want to delete this world?")) return;

      const modelToDelete = await DataStore.query(World, id);
      DataStore.delete(modelToDelete);
      this.fetchWorlds();
      
      this.$root.showUserMsg(`Removed world.`);
    },
    
    //add a patron
    async addPatronToWorld(id)
    {
      const patronType = this.rollOnTable("patron");
      let modelToAdd = { "id": shortid.generate(), "name": "", "type": patronType, "benefit": "", "notes": "" };
      let world = this.worlds.find(w => w.id === id);
      world.patrons_known.patrons.push(modelToAdd);
    },
    //add a rival
    async addRivalToWorld(id)
    {
      const rivalType = this.getRivalType();
      let modelToAdd = { "id": shortid.generate(), "name": "", "type": rivalType, "notes": "" };
      let world = this.worlds.find(w => w.id === id);
      world.rivals_known.rivals.push(modelToAdd);
    },

    getRivalType() {
      const roll = this.$options.tables.GetFullTableResult('enemyencountercategory');
      return roll.find(x => x.table == "unknownrival").result;
    },

    print() {
      if (this.editing) {
        this.saveCrew();
      }      
      this.worldEdit.forEach( (id) => {
        this.saveWorld(id);
      });
      this.crewEdit.forEach( (id) => {
        this.saveCrewMember(id);
      });
    
      const myCollapse = document.getElementById('collapseMembers');
      const mCollapse = new Collapse(myCollapse, { toggle: false});
      mCollapse.show();

      const worldCollapse = document.getElementById('collapseWorlds')
      const wCollapse = new Collapse(worldCollapse, { toggle: false});
      wCollapse.show();
           
      setTimeout(function() {window.print();}, 1000);
    }
  }
}
</script>

<style scoped>
  label {        
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  h4, .h4
  h5, .h5 {
    background-color: #ccc;
  }

  .bg-dead {
    background-color: #fff0f0 !important;
  }

  .bg-leader {
    background-color: #f0f0ff;
  }

  .bg-sick {
    background-color: #f8ffde;
  }

  .form-control {
    padding: 1px;
  }

  .form-text {
    margin-top: 0px;
    font-size: 1em;
    font-style: italic;
  }

  input[type=number] {
    text-align: center;
  }

  .w-md-50 {
    width: 50% !important;
  }

  td,th {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  @media (max-width: 991.98px) {
    .w-md-50 {
      width: 100% !important;
    }
  }

  @media print
  {
    .print-keep-together {
      page-break-after: avoid;      
    }

    .page-break-after {
      page-break-after: always;  
      height: 0;
      display: block; 
      clear: both;
    }    

    #accordionMembers {
      font-size: .7em !important;
    }

    .attributes {
        flex-wrap: unset !important;
    }
    
  }
</style>
