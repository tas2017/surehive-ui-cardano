import React from 'react'

export type LogoProps = {
  color: string
  alt?: string
}
export const LogoImage = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 85 65">
    <g transform="matrix(0.15065354,0,0,0.15065354,28.918704,11.286621)" id="g120">
      <path
        id="logo"
        fill={color}
        stroke={color}
        strokeWidth="1"
        d="M 8.39,7.02
           C 11.13,5.96 14.93,5.34 17.71,7.02
             23.07,10.43 23.54,18.61 17.71,21.98
             9.53,26.81 -1.68,16.60 8.39,7.02 Z
           M 160.00,312.00
           C 160.00,312.00 127.00,312.00 127.00,312.00
             124.72,312.00 121.35,312.22 119.39,310.98
             117.40,309.71 115.08,305.15 113.80,303.00
             113.80,303.00 101.72,282.00 101.72,282.00
             101.72,282.00 50.85,194.00 50.85,194.00
             50.85,194.00 38.15,172.00 38.15,172.00
             36.45,169.01 33.98,165.59 34.60,162.00
             35.12,158.98 43.33,145.65 45.42,142.00
             45.42,142.00 65.60,107.00 65.60,107.00
             65.60,107.00 74.95,91.57 74.95,91.57
             79.15,87.58 84.30,93.37 89.56,85.94
             91.43,83.31 94.04,79.32 93.40,76.00
             92.76,72.72 89.49,69.65 89.97,66.00
             90.31,63.40 95.78,54.73 97.40,52.00
             97.40,52.00 112.40,26.00 112.40,26.00
             114.01,23.28 116.77,17.57 119.33,16.02
             121.37,14.78 124.65,15.00 127.00,15.00
             127.00,15.00 284.00,15.00 284.00,15.00
             285.77,15.00 289.06,14.86 290.62,15.57
             293.78,17.01 299.91,29.43 302.01,33.00
             302.01,33.00 334.99,90.00 334.99,90.00
             334.99,90.00 364.42,141.00 364.42,141.00
             366.66,144.90 375.76,159.63 375.97,163.00
             376.17,166.16 372.76,171.19 371.15,174.00
             371.15,174.00 357.80,197.00 357.80,197.00
             357.80,197.00 308.72,282.00 308.72,282.00
             308.72,282.00 297.15,302.00 297.15,302.00
             295.69,304.56 293.25,309.53 290.79,310.98
             288.70,312.21 285.38,312.00 283.00,312.00
             283.00,312.00 250.00,312.00 250.00,312.00
             250.00,312.00 250.00,133.00 250.00,133.00
             250.00,133.00 269.00,133.00 269.00,133.00
             269.00,133.00 269.00,227.00 269.00,227.00
             269.00,227.00 269.00,255.00 269.00,255.00
             269.00,255.00 270.00,272.00 270.00,272.00
             270.00,272.00 285.15,245.00 285.15,245.00
             285.15,245.00 315.15,193.00 315.15,193.00
             315.15,193.00 326.60,173.00 326.60,173.00
             328.15,170.40 331.26,166.02 331.11,163.00
             330.98,160.33 326.15,152.73 324.58,150.00
             324.58,150.00 307.28,120.00 307.28,120.00
             307.28,120.00 278.42,70.00 278.42,70.00
             276.11,65.98 270.96,55.25 266.90,53.60
             265.13,52.88 261.95,53.00 260.00,53.00
             260.00,53.00 150.00,53.00 150.00,53.00
             140.02,53.02 141.38,53.66 132.58,69.00
             132.58,69.00 104.85,117.00 104.85,117.00
             104.85,117.00 86.99,148.00 86.99,148.00
             85.13,151.17 79.45,159.74 79.33,163.00
             79.22,165.96 82.24,170.40 83.72,173.00
             83.72,173.00 95.28,193.00 95.28,193.00
             95.28,193.00 141.00,272.00 141.00,272.00
             141.00,272.00 141.00,185.00 141.00,185.00
             141.00,185.00 160.00,185.00 160.00,185.00
             160.00,185.00 160.00,312.00 160.00,312.00 Z
           M 34.39,23.01
           C 37.49,21.82 44.52,21.08 47.43,23.01
             53.85,27.13 53.60,37.83 47.43,42.01
             45.23,43.46 36.71,43.42 34.53,42.01
             32.50,40.69 29.48,35.38 29.23,33.00
             28.85,29.46 31.97,25.29 34.39,23.01 Z
           M 72.61,25.01
           C 75.38,23.87 79.92,23.30 82.54,25.01
             87.67,28.25 87.43,36.78 82.54,40.01
             76.96,43.59 69.59,39.05 68.86,33.00
             68.46,29.69 70.43,27.16 72.61,25.01 Z
           M 9.61,53.99
           C 12.99,52.62 19.58,52.17 22.61,54.60
             30.59,61.01 27.30,74.55 17.00,74.98
             15.34,75.05 11.84,75.09 10.38,74.43
             8.56,73.60 7.39,71.65 6.44,69.98
             2.84,63.65 4.65,58.90 9.61,53.99 Z
           M 110.21,54.60
           C 101.05,60.67 103.31,73.99 115.00,73.99
             116.48,73.99 118.52,73.96 119.90,73.40
             127.38,70.36 127.46,60.29 121.61,55.60
             118.72,53.28 113.57,53.82 110.21,54.60 Z
           M 48.33,65.02
           C 51.95,63.66 61.46,63.07 64.61,65.60
             66.81,67.36 70.56,74.15 70.56,77.00
             70.56,80.50 66.19,88.06 62.90,89.40
             61.29,90.06 58.74,89.99 57.00,90.00
             54.50,90.01 50.47,90.27 48.33,88.98
             46.53,87.89 45.32,85.77 44.29,84.00
             43.39,82.45 41.88,79.73 41.63,78.00
             41.01,73.75 45.31,67.66 48.33,65.02 Z
           M 168.00,96.00
           C 168.00,96.00 188.00,96.00 188.00,96.00
             188.00,96.00 188.00,312.00 188.00,312.00
             188.00,312.00 168.00,312.00 168.00,312.00
             168.00,312.00 168.00,96.00 168.00,96.00 Z
           M 74.18,105.81
           C 66.70,110.40 68.74,119.83 76.01,120.85
             86.00,122.26 87.88,110.03 81.61,105.81
             79.35,104.58 76.61,105.05 74.18,105.81 Z
           M 196.00,163.00
           C 196.00,163.00 215.00,163.00 215.00,163.00
             215.00,163.00 215.00,312.00 215.00,312.00
             215.00,312.00 196.00,312.00 196.00,312.00
             196.00,312.00 196.00,163.00 196.00,163.00 Z
           M 223.00,212.00
           C 223.00,212.00 242.00,212.00 242.00,212.00
             242.00,212.00 242.00,312.00 242.00,312.00
             242.00,312.00 223.00,312.00 223.00,312.00
             223.00,312.00 223.00,212.00 223.00,212.00 Z"
      />
    </g>
  </svg>
)