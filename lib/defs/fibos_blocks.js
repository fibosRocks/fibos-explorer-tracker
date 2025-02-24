"use strict";

const cache = require("fib-cache");
let blockCache = new cache.LRU({max: 1000, ttl: 30 * 1000});

module.exports = db => {
	/**
	 * @api DBConfig Table Define
	 * @apiVersion 1.0.0
	 * @apiGroup FibosBlocks
	 * @apiDescription FibosBlocks Table字段解释
	 *
	 * @apiParam {Number} id 自增长 id
	 * @apiParam {Number} block_num 区块高度
	 * @apiParam {Date} block_time 区块时间
	 * @apiParam {String} producer_block_id 区块 hash
	 * @apiParam {String} producer 区块生产者
	 * @apiParam {String} status 是否可逆状态 reversible noreversible
	 * @apiParam {Date} createdAt
	 * @apiParam {Date} changedAt
	 */

	let FibosBlocks = db.define('fibos_blocks', {
		id: {
			type: "serial",
			size: 8,
			key: true,
			big: true,
			comment: "self increment id"
		},
		block_num: {
			required: true,
			type: "integer",
			size: 8,
			index: true,
			comment: "block number"
		},
		block_time: {
			required: true,
			type: "date",
			time: true,
			comment: "block time"
		},
		producer_block_id: {
			unique: true,
			required: true,
			type: "text",
			size: 64,
			index: "p_b_id_index",
			comment: "block hash",
		},
		previous: {
			required: true,
			type: "text",
			size: 64,
			comment: "previous block hash"
		},
		producer: {
			required: true,
			type: "text",
			size: 12,
			comment: "block producer"
		},
		status: {
			required: true,
			type: "enum",
			values: ["irreversible", "pending", "lightconfirm"],
			default: "pending",
			index: true,
			comment: "block status"
		}
	});

	FibosBlocks.get_sys_last = () => {
		let rs = FibosBlocks.find({}).order("-block_num").limit(1).runSync();
		return rs.length === 1 ? rs[0].block_num : 0;
	}

	FibosBlocks.get_final_irreversible_block = () => {
		let rs = FibosBlocks.find({ status: "irreversible" }).order("-block_num").limit(1).runSync();
		return rs.length === 1 ? rs[0].block_num : 0;
	}

	FibosBlocks.get = (producer_block_id) => {
		return blockCache.get("fibos_block_" + producer_block_id, () => {
			return FibosBlocks.oneSync({
				producer_block_id: producer_block_id
			});
		});
	}

	return FibosBlocks;
};