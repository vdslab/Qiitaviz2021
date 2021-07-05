class Edge {
    from;
    to;
    cost;
  
    constructor(from, to, cost) {
      this.from = from;
      this.to = to;
      this.cost = cost;
    }
  
  }
  
  
  class UnionFind {
    parent = [];
  
    constructor(n) {
      for(let i = 0; i < n; i++) {
        this.parent.push(i);
      }
    }
  
    root(x) {
      if(this.parent[x] === x) return x;
      this.parent[x] = this.root(this.parent[x]);
      return this.parent[x];
    }
  
    unite(x, y) {
      let rx = this.root(x);
      let ry = this.root(y);
      if(rx === ry) return 0;
      this.parent[rx] = ry;
    }
  
    same(x, y) {
      let rx = this.root(x);
      let ry = this.root(y);
  
      if(rx === ry) {
        return true;
      } else {
        return false;
      }
    }
  
}

const convertData = () => {
    const res = [];
    const response1 = await fetch('data/jaccard_data_100.json');
    const response2 = await fetch('data/difficulty_data_100.json');

    const jaccard_data = await response1.json();
    const diff_data = await response2.json();
    
    const len = jaccard_data.length;

    const es = [];
    const uf = new UnionFind(len);
    for(let i = 0; i < len; i++) {
        const obj = {};
        obj['NodeName'] = diff_data[i]['tag'];
        obj['diff'] = diff_data[i]['difficulty'];
        obj['ID'] = i+1;
        obj['url'] = `https://qiita.com/tags/${diff_data[i]['tag'].toUpperCase()}`;
        obj['childNode'] = [];
        res.push(obj);
    }

    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            if(i != j) {
                es.push(new Edge(i, j, jaccard_data[i]['jaccard'][j]));
            }
        }
    }

    es.sort((a, b) => {
        return b.cost - a.cost;
    })

    for(let i = 0; i < 100; i++) {
        console.log(es[i]);
    }


    for(const item of es) {
        if(uf.same(item.to, item.from) === false) {
            uf.unite(item.to, item.from);
            const to, from;
            if(diff_data[item.to]['diffculty'] >= diff_data[item.from]['diffculty']) {
                to = item.to;
                from = item.from;
            } else {
                to = item.from;
                from = item.to;
            }

            res[from]['childNode'].push(to+1);

        }
    }

    for(let i = 0; i < 100; i++) {
        console.log(res[i]);
    }
    return res;
}