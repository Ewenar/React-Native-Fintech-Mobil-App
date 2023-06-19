export default function (data) {
    const result = data.map(entry => {
        return {rates: Object.keys(entry)[0]};
      });
    console.log(result);
};


