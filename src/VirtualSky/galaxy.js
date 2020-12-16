import {radec2xy} from './projections.js';
import d3 from 'd3'

const d2r = Math.PI/180;

export const getGalaxy = (projection, azOff, config) =>{
  const galaxy=[]
  galaxyDefinition.forEach((g, i) => {
    const line = []
    for(let i=0; i<g.length; i+=2){
      const point = radec2xy(g[i]*d2r, g[i+1]*d2r, projection, azOff, config);
      if(typeof point === "object"){
        line.push(point)
      }
    }
    galaxy.push(line);
  });
  return galaxy;
}

export const drawGalaxy = (svg, galaxy) =>{
  var lineFunction = d3.svg.line()
       .x(d =>{ return d.x; })
       .y(d =>{ return d.y; })
       .interpolate("linear");
  galaxy.forEach((line, i) => {
      svg.append("path")
          .attr("d", lineFunction(line))
          .attr("stroke", "#396bad40")
          .attr("stroke-width", 2)
          .attr("fill", i===0?"#396bad20":"#000");
          // .attr("fill", "#396bad20");
   });
}

const galaxyDefinition = [
		[254.1778,-21.5124,253.6146,-22.5310,253.2638,-27.7008,251.9368,-29.7742,249.7919,-29.7867,247.8000,-28.4406,246.5570,-26.9571,244.6278,-25.8787,242.5067,-26.0070,241.5945,-25.3687,240.7208,-23.0525,239.5973,-22.3533,238.6863,-23.5322,238.7180,-25.7313,239.4131,-28.0723,238.6475,-30.8747,239.9512,-34.4963,240.4545,-37.0030,238.8220,-39.1709,235.6101,-41.6744,234.5926,-42.9833,235.6221,-44.6917,235.5743,-46.4283,232.6913,-48.4186,228.3087,-49.7552,225.9823,-50.6267,221.4249,-52.5289,216.0338,-54.6596,209.0229,-55.3209,202.9102,-56.0362,196.2626,-56.3616,191.7337,-57.1169,184.7426,-59.1857,180.5514,-58.8402,175.1997,-58.5802,170.6339,-57.6749,168.3549,-56.2380,163.3607,-54.7001,159.2106,-51.3301,154.8495,-47.2975,150.0574,-45.2411,146.8211,-44.7221,145.5418,-45.4794,145.6709,-46.1571,149.5391,-48.3145,150.7915,-49.6707,150.0747,-51.0247,147.4159,-49.8497,144.3472,-47.8592,142.7713,-47.5886,142.7304,-48.1825,141.8590,-48.7921,143.8702,-51.7563,146.7533,-53.8733,146.7337,-54.7900,145.4937,-55.0315,136.3994,-53.7185,133.1890,-53.9932,132.3952,-55.2722,133.9782,-56.3603,137.5581,-56.8447,142.3823,-56.7640,147.1253,-56.7384,149.2668,-57.3424,151.0831,-57.4354,153.9265,-58.4216,157.9421,-58.9774,159.0422,-59.6771,157.5067,-60.3507,155.1830,-59.7783,151.9601,-59.2083,149.2887,-59.3163,148.3379,-59.9243,149.9157,-61.4340,154.0475,-62.1249,155.9994,-62.2575,159.2582,-63.5263,165.5091,-63.4204,167.1619,-62.8290,170.1596,-61.3662,172.9661,-61.4156,176.0518,-62.9133,179.3437,-64.2607,181.9387,-65.3282,184.3779,-69.3924,188.2568,-70.9570,194.7347,-71.2607,199.7570,-70.2394,204.1730,-68.8427,209.0938,-67.8511,216.7510,-68.0095,221.9748,-67.1396,227.5494,-66.2461,234.5158,-64.3854,240.5233,-61.8468,244.0983,-60.4173,251.3801,-59.1124,253.2926,-57.4685,254.7774,-56.3244,261.4819,-54.4899,265.8676,-50.8482,268.8085,-48.0793,269.9543,-46.3469,270.5405,-43.6313,270.6492,-42.3809,271.0668,-41.1083,273.1271,-38.6387,274.8287,-36.5477,276.5511,-33.8477,275.4040,-33.1596,275.2727,-30.5290,276.8968,-28.1703,277.9533,-25.4297,278.6386,-22.3113,279.4081,-19.7351,280.9230,-17.4472,281.9964,-15.6719,282.8788,-13.6664,283.3409,-11.0282,284.5659,-8.4787,285.8740,-5.6156,287.7313,-3.1057,289.7038,-1.0941,290.4044,-0.0164,290.7342,1.1813,291.9363,0.4122,292.8626,0.7917,295.5690,0.8033,297.0695,1.1497,297.0874,2.1407,295.9694,2.3815,294.6764,2.5679,294.4415,3.7745,295.0541,5.1814,296.9021,5.9879,297.7330,6.5454,297.6053,8.4351,298.6240,10.2040,298.1628,13.5562,299.1257,15.5289,302.8713,15.4981,305.5156,16.1286,308.1366,16.6469,308.7496,18.5262,307.5513,19.8431,307.7080,20.7394,309.0176,21.5802,308.7945,23.5149,309.4605,24.2478,310.5891,24.9863,310.3480,26.0982,308.9284,26.8788,309.1600,27.5971,311.8741,29.1431,313.3279,32.0552,313.9435,35.1102,314.9513,36.1769,319.2157,38.0107,320.5720,39.7440,321.0403,40.9232,321.8310,41.6873,323.6238,44.8754,325.1386,46.0919,328.0798,46.8738,332.6317,47.1238,338.1292,47.4766,344.7038,47.6502,346.4796,47.7702,351.3753,46.7280,355.1420,46.2097,359.5920,46.1929,4.3035,46.2481,8.0516,45.6862,10.5201,45.7218,12.3781,45.1055,16.3043,45.2972,19.0389,44.8213,23.6309,45.0223,30.7979,43.0638,32.8210,42.8635,40.6571,43.7653,43.6189,43.8484,46.6891,42.5931,45.3773,41.6641,41.7099,41.8080,39.3969,41.6311,36.5579,40.8644,36.3328,39.9578,39.0080,38.9254,43.4828,39.0665,47.0254,39.2746,50.5370,39.3676,53.6788,39.5428,55.7670,38.8688,57.1481,37.3216,57.2361,35.7482,56.6404,33.7143,57.1765,32.1478,58.8043,30.8405,59.9439,30.9968,61.4966,33.3066,61.4994,36.0547,61.1808,38.6650,61.7684,40.0026,63.8402,40.1004,71.4989,34.6769,75.3343,31.9184,79.7168,29.0407,81.0519,25.1195,82.1320,22.0941,83.6308,17.4698,85.5679,15.1690,86.9568,12.6324,87.7444,8.8192,91.3008,6.1831,92.8266,2.6539,94.6923,-2.1965,97.7264,-6.0265,102.5525,-9.6439,104.6125,-11.6416,105.1552,-14.2536,108.2256,-18.5894,109.6456,-25.3483,111.2200,-27.2135,111.2669,-32.1720,114.7741,-37.8718,116.9787,-42.4014,117.0836,-45.1959,116.1853,-48.6868,118.8947,-50.1703,123.5005,-49.9484,125.9819,-48.8761,122.1675,-44.3179,122.4135,-42.9137,124.6591,-42.8292,129.1849,-46.1315,132.5020,-47.4562,134.3955,-47.4750,135.7144,-46.3461,131.5066,-42.8910,132.0107,-42.0135,137.8183,-45.2697,139.3131,-45.0639,139.6524,-44.1094,136.9034,-40.6399,136.6626,-38.9913,139.6753,-40.1504,144.8151,-42.6899,150.5786,-42.3526,153.6316,-43.0367,155.7573,-42.5342,156.1233,-41.0904,152.5690,-38.5605,148.4971,-37.7767,141.2865,-38.2886,135.1421,-35.9600,129.8501,-32.1764,126.2320,-28.4253,122.1594,-21.3427,118.5304,-12.7577,116.3335,-8.7013,112.8556,-6.4334,109.1321,-2.3025,108.1548,0.0096,107.9889,5.4587,106.7266,8.9737,103.4908,11.8896,101.3959,15.0964,99.5314,17.7842,97.6915,19.7759,96.9057,21.2016,90.6296,24.9510,88.0744,27.4918,86.0675,31.0217,85.2336,32.7789,81.6446,36.8533,79.8386,39.1558,78.6539,44.2051,77.5234,45.5296,73.0840,46.1406,69.0884,46.5652,66.4784,48.5322,65.0187,50.6773,63.1096,51.4737,60.4311,51.8441,60.2604,52.7052,63.6488,52.7609,65.6099,53.0495,68.0178,52.7517,68.0826,53.7533,63.1671,54.9872,57.4967,55.4868,58.4393,56.1385,60.5618,56.2369,62.6651,56.7553,62.6924,57.7129,59.3107,59.2013,50.7444,59.4785,45.7503,59.6435,43.3097,60.6511,38.7256,61.5348,35.7107,62.5099,30.2614,62.7058,27.5803,63.4145,23.1877,65.0421,18.5579,65.6747,13.7778,67.5849,11.2150,68.1610,7.5359,67.6326,5.1034,66.7569,2.2150,66.1991,0.2476,66.2511,355.2714,64.4260,350.1006,62.9385,344.4302,62.4847,339.3002,60.4931,333.4702,58.8851,331.1327,59.4605,330.9382,61.9623,340.6152,65.1092,343.2879,66.7647,343.3581,70.1643,341.1773,70.8790,336.6449,73.1299,333.5813,75.1391,324.6186,76.5981,322.6315,75.9427,319.0891,73.7015,314.8850,71.0639,315.6348,68.7048,315.4588,66.8973,313.0831,64.8622,312.0635,62.5880,314.0142,60.2312,313.6305,59.4861,311.8591,59.3915,309.8048,58.5233,310.2041,57.1819,306.9144,55.9804,304.6804,54.7702,305.2319,53.7273,307.7332,52.9357,308.4628,52.2243,308.0011,51.7205,306.5029,51.7495,304.1552,50.3598,302.5798,48.5193,302.1408,47.1988,300.7148,46.6004,299.0278,47.0595,297.2437,46.8711,295.7553,46.0584,294.7485,44.4314,292.7755,41.4764,288.6933,39.1997,287.4471,37.8510,287.5118,36.7221,289.2538,36.0606,290.9985,36.0011,292.6594,35.2362,292.3950,34.1260,291.2070,33.2023,288.4240,33.0160,287.0090,32.3231,286.5059,31.2666,287.0896,29.6223,286.5820,27.3683,285.1771,25.5062,283.1010,23.9449,281.0469,22.8010,279.4373,21.4068,279.1821,19.6473,279.7551,18.2109,280.9496,17.7421,282.6220,17.1833,283.2966,16.1546,283.0965,15.0372,281.5283,14.0053,280.0909,12.9151,278.6961,11.5975,277.0707,10.5385,275.4225,9.5688,273.4622,8.5487,270.9916,7.3738,269.3157,5.7621,268.8705,4.4507,269.5389,3.1987,271.0927,2.6855,273.2811,2.5608,275.4739,3.3006,278.1912,5.0780,281.9090,8.5271,284.1697,11.3576,286.2251,14.0132,286.3233,15.1915,286.1158,15.5100,285.7599,16.6912,286.7631,18.2914,287.1951,19.3787,286.9849,20.8446,289.3257,22.5391,291.9464,25.4127,292.4286,28.5332,293.4593,30.5996,297.2230,32.4772,299.7133,35.0595,303.4745,35.0807,304.1266,34.0245,303.6819,30.3270,300.8895,28.8322,296.8912,28.3993,294.9144,27.6937,294.5657,26.6140,296.1041,25.9037,297.3739,25.6845,297.8246,24.4710,295.9400,22.7956,293.0649,21.4866,291.1229,20.8588,290.3240,19.7277,290.6364,18.7692,292.0849,18.3219,293.1902,17.8198,293.1968,16.4933,292.2117,15.0311,290.2679,13.8513,288.7569,12.5900,288.6076,10.9218,288.7328,9.7665,287.2839,8.8429,285.5820,8.1189,284.2910,7.0396,283.2366,5.8411,282.9327,3.8283,282.5522,3.2275,280.8435,2.7268,279.3674,2.2532,278.3224,1.3453,278.2314,0.7429,279.1609,1.5654,279.5029,0.9574,279.8970,-0.2562,281.6814,-0.8823,283.4665,-1.5073,284.0658,-2.4642,282.9599,-3.4894,281.1068,-3.6991,279.0490,-4.0172,278.1079,-5.1256,278.2582,-6.7990,279.0976,-9.4057,278.6578,-11.6460,277.3170,-14.1578,276.1600,-16.6976,275.8960,-19.1108,275.5302,-21.8370,274.9452,-24.2398,272.9984,-26.4299,270.0613,-28.0668,268.2229,-29.8114,268.5228,-30.2623,267.9381,-32.1320,267.1568,-33.2373,265.0719,-33.6050,262.2933,-32.3327,261.2061,-30.0066,261.2532,-27.8653,261.7517,-26.3868,262.0161,-24.8538,263.5809,-22.8788,265.0658,-21.1691,265.8074,-19.4150,266.6842,-18.7916,268.0278,-18.7995,268.7521,-17.4910,268.3084,-15.3906,266.9707,-13.3787,264.9872,-12.4603,262.4372,-12.2113,260.5499,-13.2122,258.4769,-14.8956,256.1174,-16.7507,254.4650,-18.3043,253.6343,-20.3552,254.1778,-21.5124,254.1778,-21.5124,254.1778,-21.5124],
		[257.4284,-35.0782,258.7567,-34.6776,259.6113,-33.6806,259.9750,-32.7946,260.9776,-32.5946,263.4189,-33.7211,265.2841,-35.1551,267.0684,-37.0106,266.5317,-38.4758,264.8234,-39.1661,263.0403,-38.8168,260.6629,-38.1140,258.3247,-38.4735,255.5110,-38.1878,254.0470,-37.3602,253.5295,-36.1222,253.7763,-35.4603,254.7476,-35.1875,256.2938,-35.0264,257.4284,-35.0782,257.4284,-35.0782,257.4284,-35.0782],
		[254.4847,-39.5230,255.2762,-39.2671,257.3657,-39.9243,258.7042,-41.3823,258.3749,-43.2682,257.0644,-43.3665,254.3218,-40.8215,254.6242,-40.4285,254.4847,-39.5230,254.4847,-39.5230,254.4847,-39.5230],
		[247.9505,-43.8132,247.7714,-42.7233,248.2105,-41.7101,249.7280,-40.8373,248.8720,-37.3180,247.1054,-36.2799,245.6020,-36.7984,243.1195,-35.6949,242.2253,-36.0340,241.9943,-38.6050,241.6221,-40.6326,239.8163,-43.0489,238.8334,-44.6762,238.5119,-46.8016,237.7857,-49.0401,236.8718,-50.6695,237.0713,-52.3828,238.9693,-53.2821,241.4236,-52.3398,244.7950,-51.3601,248.9798,-51.6343,253.4436,-51.0624,257.8767,-50.6966,260.9423,-50.2581,261.6140,-49.2459,260.7624,-46.4869,260.5888,-45.3986,259.8614,-44.8904,257.7870,-44.9484,256.1962,-45.7995,256.3613,-48.5425,253.5419,-49.9573,249.8040,-49.5087,248.3220,-49.4156,245.7227,-48.7635,244.6261,-48.0299,245.6396,-46.7119,247.9407,-46.1849,251.5170,-45.7312,252.8143,-45.1508,251.9638,-44.5626,249.5206,-44.4962,247.9505,-43.8132,247.9505,-43.8132,247.9505,-43.8132],
		[231.8281,-52.4833,233.5614,-52.5365,234.4273,-52.7145,236.0044,-53.8647,236.5304,-55.8352,237.3389,-57.1286,230.3741,-58.8315,226.4955,-59.1351,221.0867,-60.4628,220.9820,-59.2769,221.7242,-59.0271,223.2728,-57.1869,226.5641,-55.0286,228.1040,-54.5097,229.9674,-52.9922,231.8281,-52.4833,231.8281,-52.4833,231.8281,-52.4833],
		[191.9931,-60.9308,195.0383,-60.9157,197.2513,-61.5730,197.6589,-63.3081,193.3910,-65.2609,190.6198,-65.3102,189.1651,-65.7997,187.9019,-65.8296,187.4866,-64.7787,188.0292,-64.2788,187.2718,-63.6037,188.0759,-62.2722,190.6559,-61.1093,191.9931,-60.9308,191.9931,-60.9308],
		[132.7337,-37.5805,133.0861,-38.9333,132.3284,-39.7468,129.7569,-39.4258,127.1207,-38.0660,124.9328,-36.1447,124.8899,-34.6079,124.7196,-32.9119,125.9376,-32.1253,127.3543,-32.6954,128.6915,-33.7875,129.6263,-35.1366,131.7847,-36.5415,132.7337,-37.5805,132.7337,-37.5805],
		[121.1825,-39.3994,119.9070,-39.0295,119.2840,-37.6001,119.3245,-36.1550,117.3621,-34.3430,116.3134,-31.1424,115.5167,-28.5014,115.3112,-26.0891,115.8367,-24.7060,117.0334,-24.5218,117.8897,-25.7087,118.5145,-28.1509,119.6664,-31.5362,121.7083,-34.8713,122.3366,-37.4519,122.1419,-39.0037,121.1825,-39.3994,121.1825,-39.3994],
		[305.9982,40.1858,309.8895,39.3472,311.2759,37.2754,311.2100,35.4356,310.1900,34.7837,308.6971,34.9849,307.5461,36.5500,305.0697,37.7876,304.5142,39.0978,305.1288,40.0209,305.9982,40.1858]
	]
