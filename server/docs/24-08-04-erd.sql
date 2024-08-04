-- Create tables
CREATE TABLE action
(
    event_id BIGINT,
    id       BIGINT AUTO_INCREMENT,
    sequence BIGINT,
    PRIMARY KEY (id)
);

CREATE TABLE bill_action
(
    action_id BIGINT UNIQUE,
    id        BIGINT AUTO_INCREMENT,
    price     BIGINT,
    title     VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE event
(
    id    BIGINT AUTO_INCREMENT,
    name  VARCHAR(255),
    token VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE event_step
(
    event_id BIGINT,
    id       BIGINT AUTO_INCREMENT,
    sequence BIGINT,
    name     VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE member_action
(
    action_id       BIGINT UNIQUE,
    id              BIGINT AUTO_INCREMENT,
    member_group_id BIGINT,
    member_name     VARCHAR(255),
    status          ENUM('IN', 'OUT'),
    PRIMARY KEY (id)
);

-- Add foreign key constraints
ALTER TABLE action
    ADD CONSTRAINT FKgf0qmub9va1xbe44nehny31yw
        FOREIGN KEY (event_id)
            REFERENCES event (id);

ALTER TABLE bill_action
    ADD CONSTRAINT FK54tx517tp0ry6453olkply4us
        FOREIGN KEY (action_id)
            REFERENCES action (id);

ALTER TABLE event_step
    ADD CONSTRAINT FKe3rkib91cvl0x5w9wqkshmn81
        FOREIGN KEY (event_id)
            REFERENCES event (id);

ALTER TABLE member_action
    ADD CONSTRAINT FK5jna51dn8fs2ir52l4uwn517u
        FOREIGN KEY (action_id)
            REFERENCES action (id);
