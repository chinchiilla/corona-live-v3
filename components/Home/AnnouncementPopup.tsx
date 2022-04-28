import React from "react";
import styled from "styled-components";

import Modal from "@components/Modal";
import { Col, Row } from "@components/Layout";
import { theme } from "@styles/themes";
import { useLocalStorage } from "@hooks/useLocalStorage";

const Wrapper = styled(Col)`
    overflow-y: auto;
    overflow-x: hidden;
    p {
        margin-bottom: 10px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 300;
        word-break: keep-all;
        text-align: center;
        * {
            color: ${theme("darkGreyText")} !important;
        }
        strong {
            font-weight: 500;
        }
        span {
            font-size: 10px;
            opacity: 0.6;
        }
        br {
            content: "";
            display: block;
            margin-top: 12px;
        }
    }
`;

interface Props {
    announcement: any;
}

const AnnouncementPopup: React.FC<Props> = ({ announcement }) => {
    const currentHours = new Date().getHours();
    if (!announcement) return <></>;
    if (!announcement || currentHours >= 23 || currentHours < 9) return <></>;
    const [lastAnnouncement, setLastAnnouncement] = useLocalStorage("lastAnnouncement");
    const show = lastAnnouncement != announcement.date;

    return (
        <Modal
            show={show}
            title='공지'
            style={{ height: "initial" }}
            closeButtonPos='bottom'
            onClose={() => setLastAnnouncement(announcement.date)}
        >
            <Wrapper fadeInUp ai='center' mb='12px'>
                <p dangerouslySetInnerHTML={{ __html: announcement.content }}></p>
            </Wrapper>
        </Modal>
    );
};

export default AnnouncementPopup;
