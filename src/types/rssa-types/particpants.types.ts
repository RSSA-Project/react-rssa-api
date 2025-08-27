export type NewParticipant = {
    study_id: string;
    participant_type: string;
    external_id: string;
    current_step: string;
    current_page: string | null;
};

export type Participant = {
    id: string;
    study_id: string;
    participant_type: string;
    external_id: string;
    condition_id: string;
    current_step: string;
    current_page: string | null;
    date_created: string;
};
