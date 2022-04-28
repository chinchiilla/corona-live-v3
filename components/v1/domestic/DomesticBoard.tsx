import React, { FC, useMemo } from "react";

import Board from "./Board";

interface Props {
    statsLive: any;
    stats: any;
}

const DomesticBoard: FC<Props> = ({ statsLive, stats }) => {
    const statsData = useMemo(
        () => [
            {
                data: stats.cases,
                title: "총 확진자수",
                info: `0시 기준 신규 확진자수`,
            },
            {
                data: [statsLive.today, statsLive.today - statsLive.yesterday],
                title: "실시간 확진자수",
                info: `어제 동시간 대비`,
            },
        ],
        [statsLive, stats]
    );

    return <Board data={statsData}></Board>;
};

export default DomesticBoard;
// const MemoDomesticBoard = React.memo(DomesticBoard, (prev, next) => {
//     return (
//         prev.data.confirmed[0] === next.data.confirmed[0] &&
//         prev.data.confirmed[1] === next.data.confirmed[1] &&
//         prev.data.current[0] === next.data.current[0] &&
//         prev.data.current[1] === next.data.current[1]
//     );
// });

// export default MemoDomesticBoard;
